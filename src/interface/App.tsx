import React from 'react';
import './App.css';
import { Game } from './components/Game';

interface AppProps {
  boardTheme: string;
  pieceTheme: string;
}

function App(props: AppProps) {

  const [FEN, setFEN] = React.useState("");

  function getNewPuzzle() {
    console.log("fetching new puzzle");
    fetch("https://a3uvljvwqa.execute-api.us-east-1.amazonaws.com/Prod/hello?op=fetchrandom", 
      {
        method: 'GET',
        headers: {
          "Content-type": "application/json"
        },
      }).then((response) => {
      return response.json();
    }).then((data) => {
      setFEN(data.fen);
    }).catch((error) => {
    });
  }

  getNewPuzzle();

  // Settings

  return (
    <div className="App">
      <Game positionFEN={FEN} fetchNewPuzzle={getNewPuzzle} themes={[props.boardTheme, props.pieceTheme]}/>
    </div>
  );
}

export default App;

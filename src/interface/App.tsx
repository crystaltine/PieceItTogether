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
    console.log("hi -1");
    fetch("https://a3uvljvwqa.execute-api.us-east-1.amazonaws.com/Prod/hello?op=fetchrandom", 
      {
        method: 'GET',
        headers: {
          "Content-type": "application/json"
        },
      }).then((response) => {
      console.log("hi");
      return response.json();
    }).then((data) => {
      console.log(data);
      console.log(data.fen);
      setFEN(data.fen);
    }).catch((error) => {
      console.log(error);
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

import React from 'react';
import './App.css';
import { Game } from './components/Game';
import { get } from 'http';

interface AppProps {
  boardTheme: string;
  pieceTheme: string;
}

function App(props: AppProps) {

  const [FEN, setFEN] = React.useState("");

  function getNewPuzzle() {
    fetch("http://127.0.0.1:3003/getrandompos").then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
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

import React from 'react';
import './App.css';
import { Game } from './components/Game';

interface AppProps {
  boardTheme: string;
  pieceTheme: string;
}

function App(props: AppProps) {

  //debug
  const [FEN, setFEN] = React.useState("5rk1/5ppp/8/8/8/3Q4/2B2PPP/5RK1 w - - 0 1");
  const [evaluation, setEvaluation] = React.useState(10001);

  function getNewPuzzle() {
    console.log("fetching new puzzle");
    
    fetch("http://127.0.0.1:3003/getrandompos").then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
      setFEN(data.fen);
      setEvaluation(data.evaluation);
    }).catch((error) => {
      console.log(error);
    });
  }

  // Settings

  return (
    <div className="App">
      <Game positionFEN={FEN} evaluation={evaluation} fetchNewPuzzle={getNewPuzzle} themes={[props.boardTheme, props.pieceTheme]}/>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import { Game } from './components/Game';

function App() {

  const [FEN, setFEN] = React.useState("5k2/1R3pp1/4p2p/8/2P2P2/2r3PP/8/6K1 b - - 0 34");
  const [evaluation, setEvaluation] = React.useState(-6.7);
  const [gameUpdater, setGameUpdater] = React.useState(false);

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

    let newGameUpdater = !gameUpdater;
    setGameUpdater(newGameUpdater);
  }

  // Settings

  return (
    <div className="App">
      <Game isComplete={gameUpdater} positionFEN={FEN} evaluation={evaluation} fetchNewPuzzle={getNewPuzzle}/>
    </div>
  );
}

export default App;

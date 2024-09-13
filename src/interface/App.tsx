import React from 'react';
import './App.css';
import { Game } from './components/Game';

const randomPositionEndpoint = 'https://api.chess.com/pub/puzzle/random';

interface AppProps {
  boardTheme: string;
  pieceTheme: string;
}

function App(props: AppProps) {

  const [FEN, setFEN] = React.useState("");

  function getNewPuzzle() {
    console.log("fetching new puzzle (getnewpuzzle)");
    fetch(randomPositionEndpoint)
    .then(res => res.json())
    .then((data) => {

      console.log(`NEW PUZZLE FETCHED: ${data.fen}`);
      setFEN(data.fen);

    }).catch((error) => {
      console.log(`ERROR IN FETCHING NEW PUZZLE: ${error}`);
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

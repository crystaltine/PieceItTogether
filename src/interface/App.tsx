import React, { useEffect } from 'react';
import './styles/App.css';
import { Game } from './components/Game';
import Axios from "axios";

function App() {

  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;

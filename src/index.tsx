import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './interface/styles/baseStyles.css';
import App from './interface/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const boardThemes = ["Green", "Brown", "Blue", "Light", "Orange", "Purple", "Red", "Tan", "Sky"];

let boardTheme = "Brown";
let pieceTheme = "Neo";
function onSelectBoardTheme(themeName: string) {
  boardTheme = themeName;
}
function onSelectPieceTheme(themeName: string) {
  pieceTheme = themeName;
}

function showHelp() {
  alert("Help");
}

function openSettingsMenu() {
  alert("Settings");
}

root.render(
  <React.StrictMode>
    <header>
      <div className="left-header">
        <img className="header-img" src="https://www.svgrepo.com/show/509812/chess-king.svg" alt=""></img>
        Puzzle thingy
      </div>
      <div id="right-header">
        <button className="header-button" onClick={showHelp}>
          <img src="https://www.svgrepo.com/show/448471/help.svg" className="header-button-img" alt="Help"></img>
        </button>
        <button className="header-button">
            <a href="https://github.com/hogridr/some-chess-thingy" target="_blank" rel="noopener noreferrer">
              <img src="https://www.svgrepo.com/show/512317/github-142.svg" className="header-button-img" alt="Github"></img>
            </a>
        </button>
        <button className="header-button" onClick={openSettingsMenu}>
          <img src="https://www.svgrepo.com/show/511122/settings.svg" className="header-button-img" alt="Settings"></img>
        </button>
      </div>
    </header>
    <App />
  </React.StrictMode>
);
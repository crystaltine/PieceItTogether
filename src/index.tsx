import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './interface/styles/baseStyles.css';
import App from './interface/App';
import Square from './interface/components/Square';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

let boardTheme = "Brown";
let pieceTheme = "neo";

/*
let settingsDropdownOpen = false;

function onSelectBoardTheme(themeName: string) {
  boardTheme = themeName;
}
function onSelectPieceTheme(themeName: string) {
  pieceTheme = themeName;
}
*/

function showHelp() {
  let popupBg = document.getElementById("popup-help-bg") as HTMLElement;
  let popupContent = document.getElementById("popup-help") as HTMLElement;
  popupBg.style.visibility = "visible";
  popupContent.style.visibility = "visible";
}
function closeHelp() {
  let popupBg = document.getElementById("popup-help-bg") as HTMLElement;
  let popupContent = document.getElementById("popup-help") as HTMLElement;
  popupBg.style.visibility = "hidden";
  popupContent.style.visibility = "hidden";
}

/*
function openSettingsMenu() {
  settingsDropdownOpen = !settingsDropdownOpen;
}
*/

root.render(
  <React.StrictMode>
    <header>
      <div className="left-header">
        <img className="header-img" src="https://www.svgrepo.com/show/509812/chess-king.svg" alt=""></img>
        Piece it Together
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
      </div>
    </header>

    <div id="popup-help-bg">
    <div id="popup-help" className="popup-help">
      <h1 style={{
        width:"100%",
        borderBottom: "2px solid rgba(255, 255, 255, 0.35)",
        paddingBottom:"5px",
        textAlign:"center",
        }}>How to Play</h1>

      <p>Each puzzle is a random position with all pieces covered.
      Each square is either empty, colored white, or colored black.
      White squares are hiding white pieces behind them, black squares are hiding black pieces.
      You will be given the evaluation of the position in a future update. However, keep in mind that it will always be highly in favor of one side.</p>

      <h3>Your goal is to guess the position exactly!</h3>

      <p>Below are the highlighting rules. If you've played&nbsp;
        <a style={{color:"skyblue"}} href="https://nytimes.com/games/wordle/index.html" target="_blank" rel="noopener noreferrer">Wordle</a>
        , you'll know what you're doing.</p>

      <div className='square-def-section'>
      <p className="square-def"><Square type="-secondary" isDarkSquare={false} value='square-highlight-gre P' themes={[boardTheme, pieceTheme]}></Square>
      <span style={{color:"#5fc252"}} className='help-highlight'>Green Squares</span>
      Correct piece and location! You do not need to touch this square again.</p>
      
      <p className="square-def"><Square type="-secondary" isDarkSquare={false} value='square-highlight-yel P' themes={[boardTheme, pieceTheme]}></Square>
      <span style={{color:"#e0d756"}} className='help-highlight'>Yellow Squares</span>
      The piece exists elsewhere on the board, but not in this specific location.</p>

      <p className="square-def"><Square type="-secondary" isDarkSquare={false} value='square-highlight-gra P' themes={[boardTheme, pieceTheme]}></Square>
      <span style={{color:"#868686"}} className='help-highlight'>Gray Squares</span>
      The piece does not exist anywhere else on the board, or they have all been identified.</p>

      <p className="square-def"><Square type="-secondary" isDarkSquare={false} value='square-highlight-blu P' themes={[boardTheme, pieceTheme]}></Square>
      <span style={{color:"#5696c9"}} className='help-highlight'>Blue Squares</span>
       Squares that have revealed by a hint. These are effectively green squares and only appear when the hint button is clicked.</p>

      <p className="square-def"><Square type="-secondary" isDarkSquare={false} value='square-highlight-mag P' themes={[boardTheme, pieceTheme]}></Square>
      <span style={{color:"#b650b3"}} className='help-highlight'>Magenta Squares</span>
      These only appear when the show solution button is clicked. When this happens, all squares will be revealed.</p>
      </div>

      <h3>You are given six attempts to find the correct configuration of pieces. 
      You may view your previous attempts by selecting the cards on the right or the attempt squares on the top bar. They will appear on the secondary board. Have fun!</h3>
      <button className="help-close-button" onClick={closeHelp}>Got it!</button>
    </div>
    </div>

    <App boardTheme={boardTheme} pieceTheme={pieceTheme}/>
  </React.StrictMode>
);
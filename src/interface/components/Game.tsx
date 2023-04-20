import React, { useState } from 'react';
import GameGrid from './GameGrid';
import EvalBar from './EvalBar';
import PieceSelection from './PieceSelection';
import UserControls from './UserControls';
import GameGridSecondary from './GameGridSecondary';
import '../styles/WrapperStyles.css';
import AttemptHistory from './AttemptHistory';

interface GameProps {
    positionFEN: string;
    evaluation: number;
    fetchNewPuzzle: () => void;
    isComplete: boolean;
}

function isNumeric(str: string) {
    return !isNaN(parseFloat(str))
}

function fenToBoard(fen: string) {
    let boardPosition: string[] = fen.split(" ")[0].split("/").join("").split("");
    for (let i = 0; i < boardPosition.length; i++) {
        if (isNumeric(boardPosition[i])) {
            boardPosition.splice(i, 1, ...Array(parseInt(boardPosition[i])).fill(""));
        }
    }
    return boardPosition;
}

function obfuscateBoard(boardState: string[]) {
    for (let i = 0; i < boardState.length; i++) {
        if (boardState[i] !== "") {
            boardState[i] = "obf-" + (["P", "N", "B", "R", "Q", "K"].includes(boardState[i])? "white" : "black");
        }
    }
    return boardState;
}

const Game = (props: GameProps) => {
    const [currDisplay, setCurrDisplay] = useState(obfuscateBoard(fenToBoard(props.positionFEN)));
    const [currSelectedPiece, setCurrSelectedPiece] = useState("none");
    const [attemptHistory, setAttemptHistory] = useState<string[]>([])

    const correctBoard = fenToBoard(props.positionFEN);

    function handleBoardReset() {
        setCurrDisplay(obfuscateBoard(fenToBoard(props.positionFEN)));
    }

    function handleClickToSelectPiece(clicked: string) {
        setCurrSelectedPiece(clicked);
    }

    function handlePiecePlacement(squareID: number) {
        if (currDisplay[squareID] === "") {
            console.log("Can't place on empty square! nothing happened. squareIndex=" + squareID + " piece=" + currSelectedPiece);
            return;
        }

        if ((currDisplay[squareID] === "obf-black" && ["P", "R", "N", "B", "Q", "K"].includes(currSelectedPiece)) ||
            (currDisplay[squareID] === "obf-white" && ["p", "r", "n", "b", "q", "k"].includes(currSelectedPiece))) {
            console.log("Wrong color piece detected! nothing changed. squareIndex=" + squareID + " piece=" + currSelectedPiece);
            return;
        }

        if (currSelectedPiece === "none") {
            console.log("No piece selected! nothing changed. squareIndex=" + squareID + " piece=" + currSelectedPiece);
            return;
        }

        console.log(`placed piece ${currSelectedPiece} on square ${squareID}! updating state...`);
        const newDisplay = [...currDisplay];
        newDisplay[squareID] = currSelectedPiece;
        setCurrDisplay(newDisplay);
    }

    function onSubmit() {
        if (currDisplay.includes("obf-white") || currDisplay.includes("obf-black")) {
            alert("You can't submit an incomplete puzzle! fill in all the hidden squares!");
            return;
        }

        if (currDisplay.toString() === correctBoard.toString()) {

        } else {
            setAttemptHistory([...attemptHistory, currDisplay.toString()]);
            setCurrDisplay(obfuscateBoard(fenToBoard(props.positionFEN)));
            // Handle hinting (highlight correct placements, etc. and put it onto the secondary board)
            // Also add to attempt history
            // Check if the user has run out of attempts
        }
    }

    return (
        <div className='game-wrapper'>
            <div className="grid-wrapper">
                <EvalBar value={props.evaluation}/>
                <GameGrid display={currDisplay} handleMove={handlePiecePlacement} gameComplete={props.isComplete}/>
            </div>
            <div className="side-wrapper">
                <div className="attempt-recorder-container">
                    <div className="previous-attempt">Previous Attempt
                        <GameGridSecondary positionFEN={props.positionFEN}/>
                    </div>
                    <div className="attempt-history">
                        <AttemptHistory attemptHistory={attemptHistory} gameComplete={props.isComplete}/>
                    </div>
                </div>
                <PieceSelection submitClicked={handleClickToSelectPiece} currSelected={currSelectedPiece} gameComplete={props.isComplete}/>
                <UserControls gameComplete={props.isComplete} submitClicked={onSubmit} resetBoard={handleBoardReset} nextPuzzle={() => {
                    props.fetchNewPuzzle();
                    }}/>
            </div>
        </div>
    );
};

export { Game };
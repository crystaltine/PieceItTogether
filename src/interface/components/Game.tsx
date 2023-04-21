import React, { useEffect, useState } from 'react';
import GameGrid from './GameGrid';
import EvalBar from './EvalBar';
import PieceSelection from './PieceSelection';
import UserControls from './UserControls';
import GameGridSecondary from './GameGridSecondary';
import '../styles/WrapperStyles.css';
import AttemptHistory from './AttemptHistory';
import { fenToBoard, obfuscateBoard } from '../../utils/utils';

interface GameProps {
    positionFEN: string;
    evaluation: number;
    fetchNewPuzzle: () => void;
    isComplete: boolean;
}

const Game = (props: GameProps) => {
    const [currDisplay, setCurrDisplay] = useState(obfuscateBoard(fenToBoard(props.positionFEN)));
    const [currSelectedPiece, setCurrSelectedPiece] = useState("none");
    const [attemptHistory, setAttemptHistory] = useState<string[]>([]);
    const [prevDisplay, setPrevDisplay] = useState<string[]>([]);

    const correctBoard = fenToBoard(props.positionFEN);

    useEffect(() => {
        setCurrDisplay(obfuscateBoard(fenToBoard(props.positionFEN)));
        setAttemptHistory([]);
        setPrevDisplay([]);
        setCurrSelectedPiece("none");
    }, [props.positionFEN, props.evaluation]);

    function handleBoardReset() {
        setCurrDisplay(obfuscateBoard(fenToBoard(props.positionFEN)));
    }

    function handleClickToSelectPiece(clicked: string) {
        if (currSelectedPiece === clicked) {
            setCurrSelectedPiece("none");
            return;
        }

        setCurrSelectedPiece(clicked);
    }

    function handlePiecePlacement(squareID: number) {
        // Tried to place on an empty square
        if (currDisplay[squareID] === "") {
            return;
        }

        // Tried to place the wrong color piece
        if ((currDisplay[squareID] === "obf-black" && ["P", "R", "N", "B", "Q", "K"].includes(currSelectedPiece)) ||
            (currDisplay[squareID] === "obf-white" && ["p", "r", "n", "b", "q", "k"].includes(currSelectedPiece))) {
            return;
        }
        
        // No piece selected
        if (currSelectedPiece === "none") {
            return;
        }

        const newDisplay = [...currDisplay];
        newDisplay[squareID] = currSelectedPiece;
        setCurrDisplay(newDisplay);
    }

    function onSubmit() {
        if (currDisplay.includes("obf-white") || currDisplay.includes("obf-black")) {
            alert("You can't submit an incomplete puzzle! fill in all the hidden squares you bozo");
            return;
        }

        if (currDisplay.toString() === correctBoard.toString()) {
            console.log("doing stuff");
            let newDisplay = [...currDisplay];
            currDisplay.forEach((value, index) => {
                if (value !== "") {
                    newDisplay[index] = "square-highlight-gre " + value;
                }
            });
            setCurrDisplay(newDisplay);
        } else {
            setCurrDisplay(obfuscateBoard(fenToBoard(props.positionFEN)));
            // Handle hinting (highlight correct placements, etc. and put it onto the secondary board)
            // Also add to attempt history
            // Check if the user has run out of attempts
            fetch(`http://127.0.0.1:3003/highlightsubm/${currDisplay.toString()}/${correctBoard.toString()}`).then((response) => {
                return response.json();
            }).then((data) => {
                let newDisplay = data['highlighted'];
                setAttemptHistory([...attemptHistory, newDisplay.toString()]);
                setPrevDisplay(newDisplay);
                setCurrDisplay(newDisplay);
            }).catch((error) => {
                console.log(error);
            });
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
                    <div className="previous-attempt">
                        <GameGridSecondary display={prevDisplay}/>
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
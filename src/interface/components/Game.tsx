import React, { useEffect, useState } from 'react';
import GameGrid from './GameGrid';
import EvalBar from './EvalBar';
import PieceSelection from './PieceSelection';
import UserControls from './UserControls';
import GameGridSecondary from './GameGridSecondary';
import '../styles/WrapperStyles.css';
import AttemptHistory from './AttemptHistory';
import { fenToBoard, obfuscateBoard } from '../../utils/utils';
import GameInfoBar from './GameInfoBar';

interface GameProps {
    positionFEN: string;
    evaluation: number;
    fetchNewPuzzle: () => void;
}

function pruneHighlightedBoard(board: string[]) {
    let prunedBoard = []
    for (let i = 0; i < board.length; i++) {
        prunedBoard.push(board[i][board[i].length-1]);
    }
    return prunedBoard;
}

const whitePieces = ["P", "N", "B", "R", "Q", "K"];
const blackPieces = ["p", "n", "b", "r", "q", "k"];

const Game = (props: GameProps) => {
    const [currDisplay, setCurrDisplay] = useState(obfuscateBoard(fenToBoard(props.positionFEN)));
    const [currSelectedPiece, setCurrSelectedPiece] = useState("none");
    const [attemptHistory, setAttemptHistory] = useState<string[]>([]);
    const [prevDisplay, setPrevDisplay] = useState<string[]>([]);
    const [isComplete, setIsComplete] = useState(false);
    const [focusIndex, setFocusIndex] = useState(-1);

    const correctBoard = fenToBoard(props.positionFEN);
    const playerToMove = props.positionFEN.split(" ")[1];

    useEffect(() => {
        setCurrDisplay(obfuscateBoard(fenToBoard(props.positionFEN)));
        setAttemptHistory([]);
        setPrevDisplay([]);
        setCurrSelectedPiece("none");
        setIsComplete(false);
    }, [props.positionFEN, props.evaluation]);

    function handleBoardReset() {
        setCurrDisplay(obfuscateBoard(fenToBoard(props.positionFEN)));
    }
    
    function focusPrevAttempt(attemptIndex: number) {

        if (attemptIndex > attemptHistory.length) {
            return;
        }

        setFocusIndex(attemptIndex);
        setPrevDisplay(attemptHistory[attemptIndex].split(","));
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
        if ((currDisplay[squareID] === "obf-black" && whitePieces.includes(currSelectedPiece)) ||
            (currDisplay[squareID] === "obf-white" && blackPieces.includes(currSelectedPiece))) {
            return;
        }
        if ((whitePieces.includes(currSelectedPiece[currSelectedPiece.length-1]) &&
            blackPieces.includes(currDisplay[squareID][currDisplay[squareID].length-1])) ||
            (blackPieces.includes(currSelectedPiece[currSelectedPiece.length-1]) &&
            whitePieces.includes(currDisplay[squareID][currDisplay[squareID].length-1]))) {
            return;
        }

        // Tried to replace a piece with a piece of the opposite color
        if ((blackPieces.includes(currDisplay[squareID]) && whitePieces.includes(currSelectedPiece)) ||
            (whitePieces.includes(currDisplay[squareID]) && blackPieces.includes(currSelectedPiece))) {
            return;
        }
        
        // No piece selected: erase
        if (currSelectedPiece === "none") {

            // If the square is already empty, do nothing
            if (currDisplay[squareID].slice(0, 3) === "obf") {
                return;
            }

            const newDisplay = [...currDisplay];
            newDisplay[squareID] = whitePieces.includes(currDisplay[squareID][currDisplay[squareID].length-1])? "obf-white" : "obf-black";
            setCurrDisplay(newDisplay);
            return;
        }

        const newDisplay = [...currDisplay];
        newDisplay[squareID] = currSelectedPiece;
        setCurrDisplay(newDisplay);
    }

    function onSubmit() {
        if (currDisplay.includes("obf-white") || currDisplay.includes("obf-black")) {

            // TODO: Signal Incomplete puzzle

            return;
        }

        if (pruneHighlightedBoard(currDisplay).toString() === correctBoard.toString()) {
            let newDisplay = [...currDisplay];
            currDisplay.forEach((value, index) => {
                if (value !== "") {
                    console.log(value);
                    if (value.slice(0, 20) === "square-highlight-blu") {
                        newDisplay[index] = value;
                    } else {
                        newDisplay[index] = "square-highlight-gre " + value;
                    }
                }
            });
            setAttemptHistory([...attemptHistory, newDisplay.toString()]);
            setFocusIndex(attemptHistory.length);
            setPrevDisplay(newDisplay);
            setCurrDisplay(newDisplay);
            setIsComplete(true);
        } else {
            setCurrDisplay(obfuscateBoard(fenToBoard(props.positionFEN)));

            fetch(`http://127.0.0.1:3003/highlightsubm/${currDisplay.toString()}/${correctBoard.toString()}`).then((response) => {
                return response.json();
            }).then((data) => {
                let newDisplay = data['highlighted'];
                setAttemptHistory([...attemptHistory, newDisplay.toString()]);
                setFocusIndex(attemptHistory.length);
                setPrevDisplay(newDisplay);
                setCurrDisplay(newDisplay);
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    // Count total number of colored squares
    function showHint() {
        let allUnsolvedIndicies: number[] = [];
        for (let i = 0; i < currDisplay.length; i++) {
            if (currDisplay[i].slice(0, 3) === "obf" || ["yel", "gra"].includes(currDisplay[i].slice(17, 20))) {
                allUnsolvedIndicies.push(i);
            }
        }
        let randIndexToShow = allUnsolvedIndicies[Math.floor(Math.random() * allUnsolvedIndicies.length)];
        let newDisplay = [...currDisplay];
        newDisplay[randIndexToShow] = `square-highlight-blu ${correctBoard[randIndexToShow]}`;
        setCurrDisplay(newDisplay);
    }

    function showSolution() {

        let solutionDisplay = [...correctBoard];
        for (let i = 0; i < solutionDisplay.length; i++) {
            if (solutionDisplay[i] !== "") {
                solutionDisplay[i] = "square-highlight-mag " + solutionDisplay[i];
            }
        }

        setCurrDisplay(solutionDisplay);
        setIsComplete(true);
    }

    return (
        <div className="app-wrapper">
            <GameInfoBar playerToMove={playerToMove} attemptCount={attemptHistory.length} focusOnAttempt={focusPrevAttempt} boardStateHistory={attemptHistory}/>
            <div className='game-wrapper'>
                <div className="grid-wrapper">
                    <EvalBar value={props.evaluation}/>
                    <GameGrid display={currDisplay} handleMove={handlePiecePlacement}/>
                </div>
                <div className="side-wrapper">
                    <div className="attempt-recorder-container">
                        <div className="previous-attempt">
                            <GameGridSecondary display={prevDisplay} attemptIndex={focusIndex}/>
                        </div>
                        <div className="attempt-history">
                            <AttemptHistory focusAttempt={focusPrevAttempt} attemptHistory={attemptHistory}/>
                        </div>
                    </div>
                    <PieceSelection submitClicked={handleClickToSelectPiece} currSelected={currSelectedPiece}/>
                    <UserControls
                        gameFEN={props.positionFEN}
                        gameComplete={isComplete}
                        submitClicked={onSubmit}
                        resetBoard={handleBoardReset}
                        showHint={showHint}
                        showSolution={showSolution}
                        nextPuzzle={() => {
                            props.fetchNewPuzzle();
                        }
                    }/>
                </div>
            </div>
        </div>
    );
};

export { Game };
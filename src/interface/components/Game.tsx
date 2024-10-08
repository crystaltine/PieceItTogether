import React, { useEffect, useState } from 'react';
import GameGrid from './GameGrid';
import PieceSelection from './PieceSelection';
import UserControls from './UserControls';
import AttemptHistory from './AttemptHistory';
import { fenToBoard, obfuscateBoard } from '../../utils/utils';
import GameInfoBar from './GameInfoBar';
import '../styles/WrapperStyles.css';
import GameGridSecondary from './GameGridSecondary';
import { highlight_submission, SquareOccupant } from '../../puzzleController/highlighter';
import EvalBar from './EvalBar';
import { getEval } from '../../puzzleController/getEval';

interface GameProps {
		positionFEN: string;
		fetchNewPuzzle: () => void;
		themes: string[];
}

function pruneHighlightedBoard(board: string[]) {
		let prunedBoard = [];
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
		const [focusIndex, setFocusIndex] = useState(-1);
		const [gameState, setGameState] = useState(0); // 0 - incomplete, 1 - complete, 2 - fail
		const [highlightIncomplete, setHighlightIncomplete] = useState(false);
		const [canSkip, setCanSkip] = useState(false);
		const [positionEval, setPositionEval] = useState(0);

		const correctBoard = fenToBoard(props.positionFEN);
		const playerToMove = props.positionFEN.split(" ")[1];

		useEffect(() => {
				setCurrDisplay(obfuscateBoard(fenToBoard(props.positionFEN)));
				setAttemptHistory([]);
				setPrevDisplay([]);
				setCurrSelectedPiece("none");
				setGameState(0);

				setCanSkip(false);
				setTimeout(() => {
						setCanSkip(true);
						console.log("skipping enabled");
				}, 10000);

		}, [props.positionFEN, props.themes]);

		// fetch eval of true position on change
		useEffect(() => {
			if (props.positionFEN === "") { return; }
			getEval(props.positionFEN).then((evalNum) => {
				setPositionEval(evalNum);
			});
		}, [props.positionFEN]);

		useEffect(() => {
				setHighlightIncomplete(false);
		}, [currDisplay]);

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

						setHighlightIncomplete(false);
						setHighlightIncomplete(true);

						return;
				}

				// Correct submission
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
						setGameState(1);

				// incorrect submission
				} else {
						if (attemptHistory.length === 5) {
								setGameState(2);
						}

						setCurrDisplay(obfuscateBoard(fenToBoard(props.positionFEN)));

			const newDisplay = highlight_submission(currDisplay as (SquareOccupant | "")[], correctBoard as (SquareOccupant | "")[])

			setAttemptHistory([...attemptHistory, newDisplay.toString()]);
			setFocusIndex(attemptHistory.length);
			setPrevDisplay(newDisplay);
			setCurrDisplay(newDisplay);
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
				setGameState(1);
		}

		return (
				<div className="app-wrapper">
						<GameInfoBar playerToMove={playerToMove} attemptCount={attemptHistory.length} focusOnAttempt={focusPrevAttempt} boardStateHistory={attemptHistory}/>
						<div className='game-wrapper'>
								<div className="grid-wrapper">
										<EvalBar value={positionEval}/>
										<GameGrid display={currDisplay} handleMove={handlePiecePlacement} type="" themes={props.themes} highlightIncomplete={highlightIncomplete}/>
								</div>
								<div className="side-wrapper">
										<div className="attempt-recorder-container">
												<div className="previous-attempt">
														<GameGridSecondary display={prevDisplay} attemptIndex={focusIndex} themes={props.themes}/>
												</div>
												<div className="attempt-history">
														<AttemptHistory focusAttempt={focusPrevAttempt} handleClick={handlePiecePlacement} attemptHistory={attemptHistory} themes={props.themes}/>
												</div>
										</div>
										<PieceSelection submitClicked={handleClickToSelectPiece} currSelected={currSelectedPiece}/>
										<UserControls gameFEN={props.positionFEN}
										gameState={gameState}
										submitClicked={onSubmit}
										resetBoard={handleBoardReset}
										showHint={showHint}
										showSolution={showSolution}
										nextPuzzle={() => { 
											props.fetchNewPuzzle()
											console.log(`nextPuzzle activated (game.tsx)`)
										}}
										canSkip={canSkip} />
								</div>
						</div>
				</div>
		);
};

export { Game };
import React from 'react';
import '../styles/WrapperStyles.css';
import '../styles/InfoBarStyles.css';

interface GameInfoProps {
    playerToMove: string;
    attemptCount: number;
    focusOnAttempt: (attemptIndex: number) => void;
    boardStateHistory: string[];
}

function calculateGradientDistribution(boardStateString: string) {

    if (boardStateString === undefined) { return }

    let boardState = boardStateString.split(",");

    // Count total number of colored squares
    let totalColoredSquares = 0;
    for (let i = 0; i < boardState.length; i++) {
        if (boardState[i].slice(0, 16) === "square-highlight") {
            totalColoredSquares += 1;
        }
    }

    // Blue just takes up the remaining space, no need to calculate
    let greenPercentage = 0;
    let yellowPercentage = 0;
    let grayPercentage = 0;

    for (let i = 0; i < boardState.length; i++) {
        if (boardState[i].slice(0, 20) === "square-highlight-yel") {
            yellowPercentage += (100.0/totalColoredSquares);
        } else if (boardState[i].slice(0, 20) === "square-highlight-gra") {
            grayPercentage += (100.0/totalColoredSquares);
        } else if (boardState[i].slice(0, 20) === "square-highlight-gre") {
            greenPercentage += (100.0/totalColoredSquares);
        }
    }

    return (
        [
            grayPercentage, // End Gray
            grayPercentage, // Start Yellow
            yellowPercentage + grayPercentage, // End Yellow
            yellowPercentage + grayPercentage, // Start Green
            greenPercentage + yellowPercentage + grayPercentage, // End Green
            yellowPercentage + grayPercentage + greenPercentage, // Start Blue
        ]
    );

}

const GameInfoBar = (props: GameInfoProps) => {

    const colorToMoveClass = props.playerToMove === "w" ? "white-to-move" : "black-to-move";

    return (
        <div className='info-bar-container'>
            <div className={colorToMoveClass}>
                <div className={`visual-${colorToMoveClass}`}></div>
                {props.playerToMove === "w" ? "White to move" : "Black to move"}
            </div>
            <div className='previous-attempt-info'>
                Attempts:
                {[0, 1, 2, 3, 4, 5].map((i) => {

                    const gradientDistribution = calculateGradientDistribution(props.boardStateHistory[i]);

                    return (
                    <div 
                        className={`attempt-checkbox${props.attemptCount >= i+1? "-filled" : ""}`}
                        onClick={() => props.focusOnAttempt(i)}
                        style={gradientDistribution? 
                        {backgroundImage: `linear-gradient(-45deg,
                            #868686 0%, #868686 ${gradientDistribution[0]}%,
                            #e0d756 ${gradientDistribution[1]}%, #e0d756 ${gradientDistribution[2]}%, 
                            #5fc252 ${gradientDistribution[3]}%, #5fc252 ${gradientDistribution[4]}%,
                            #5696c9 ${gradientDistribution[5]}%, #5696c9 100%)`
                        } : {}}
                    ></div>
                    )
                })}
            </div>
        </div>
    );
};

export default GameInfoBar;
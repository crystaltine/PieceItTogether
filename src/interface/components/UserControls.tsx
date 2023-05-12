import React from 'react';
import '../styles/ActionsStyles.css'

interface UserControlsProps {
    gameState: number;
    gameFEN: string;
    submitClicked: () => void;
    resetBoard: () => void;
    showHint: () => void;
    showSolution: () => void;
    nextPuzzle: () => void;
    canSkip: boolean;
}

const UserControls = (props: UserControlsProps) => {

    const submitButtonOptions = {
        "titles": ["Submit!", "Continue", "Show Solution"],
        "classes": ["submit-button", "continue-button", "show-solution-button"],
        "handlers": [props.submitClicked, props.nextPuzzle, props.showSolution]
    };

    let submitButtonDisplay = submitButtonOptions.titles[props.gameState];

    return (
        <div className='user-control-container'>
            <button className={submitButtonOptions.classes[props.gameState]} onClick={submitButtonOptions.handlers[props.gameState]}>
                {submitButtonDisplay}
            </button>
            <button className="faded-user-control-button" onClick={props.showHint}>
                <img className="user-ctrl-button-icon" src="https://www.svgrepo.com/show/487520/lightbulb.svg" alt="Hint"></img>
            </button>
            <button className="transparent-user-control-button" onClick={props.showSolution}>
                <img className="user-ctrl-button-icon" src="https://www.svgrepo.com/show/381583/circle-star.svg" alt="Solution"></img>
            </button>
            <button className="transparent-user-control-button" onClick={props.resetBoard}>
                <img className="user-ctrl-button-icon" src="https://www.svgrepo.com/show/175356/circular-arrow.svg" alt="Reset Board"></img>
            </button>
            <button className={props.canSkip? "transparent-user-control-button" : "disabled-button"} onClick={props.canSkip? props.nextPuzzle : undefined}>
                <img className="user-ctrl-button-icon" src="https://www.svgrepo.com/show/471906/skip-forward.svg" alt="Next Puzzle"></img>
            </button>
            <button className="transparent-user-control-button">
                <a target="_blank" rel="noopener noreferrer" href={`https://www.chess.com/analysis?fen=${props.gameFEN}`}>
                    <img className="user-ctrl-button-icon" src="https://www.svgrepo.com/show/509810/chess-board.svg" alt="Analysis"></img>
                </a>
            </button>
        </div>
    );
};

export default UserControls;
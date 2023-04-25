import React from 'react';
import '../styles/ActionsStyles.css'

interface UserControlsProps {
    gameComplete: boolean;
    gameFEN: string;
    submitClicked: () => void;
    resetBoard: () => void;
    showHint: () => void;
    showSolution: () => void;
    nextPuzzle: () => void;
}

const UserControls = (props: UserControlsProps) => {

    let submitButtonDisplay = props.gameComplete? "Continue" : "Submit!";

    return (
        <div className='user-control-container'>
            <button className={props.gameComplete? `continue-button` : `submit-button`} onClick={props.gameComplete? props.nextPuzzle : props.submitClicked}>
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
            <button className="transparent-user-control-button" onClick={props.nextPuzzle}>
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
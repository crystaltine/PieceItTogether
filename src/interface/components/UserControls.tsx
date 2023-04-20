import React from 'react';
import '../styles/ActionsStyles.css'

interface UserControlsProps {
    gameComplete: boolean;
    submitClicked: () => void;
    resetBoard: () => void;
    nextPuzzle: () => void;
}

const UserControls = (props: UserControlsProps) => {
    return (
        <div className='user-control-container'>
            <button className="submit-button" onClick={props.submitClicked}>
                Submit!
            </button>
            <button className="faded-user-control-button">
                <img className="user-ctrl-button-icon" src="https://www.svgrepo.com/show/445965/question-mark.svg" alt="Hint"></img>
            </button>
            <button className="transparent-user-control-button">
                <img className="user-ctrl-button-icon" src="https://www.svgrepo.com/show/487520/lightbulb.svg" alt="Solution"></img>
            </button>
            <button className="transparent-user-control-button" onClick={props.resetBoard}>
                <img className="user-ctrl-button-icon" src="https://www.svgrepo.com/show/175356/circular-arrow.svg" alt="Reset Board"></img>
            </button>
            <button className="transparent-user-control-button" onClick={props.nextPuzzle}>
                <img className="user-ctrl-button-icon" src="https://www.svgrepo.com/show/471906/skip-forward.svg" alt="Next Puzzle"></img>
            </button>
            <button className="transparent-user-control-button">
                <img className="user-ctrl-button-icon" src="https://www.svgrepo.com/show/499605/gear-settings.svg" alt="Settings"></img>
            </button>
        </div>
    );
};

export default UserControls;
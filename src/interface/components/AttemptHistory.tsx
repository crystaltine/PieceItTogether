import React from 'react';
import '../styles/PreviousAttemptStyles.css';

import { undoToString } from '../../utils/utils';
import GameGridPreview from './GameGridPreview';

interface AttemptHistoryProps {
    attemptHistory: string[];
    focusAttempt: (attemptIndex: number) => void;
}

const AttemptHistory = (props: AttemptHistoryProps) => {
    if (props.attemptHistory.length === 0) {
        return (
            <div className="attempts-list" style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflowY: "auto"
            }}>
                <div className="attempts-list-title">
                    Attempt History <br></br>
                    Will Appear Here!
                </div>
            </div>
        );
    }

    return (
        <div className='attempts-list-wrapper-border'>
            <div className="attempts-list">
            {props.attemptHistory.map((attempt, index) => {
                let display = undoToString(attempt);
                return (
                    <div className='attempt-container' onClick={() => props.focusAttempt(index)}>
                        <span style={{
                            "color": "white",
                            "textAlign": "center",
                            "margin": "2px 0",
                            "padding": "0px -2px"
                        }}> Attempt {index + 1} </span>
                        <GameGridPreview display={display}/>
                    </div>
                );
            })
            }
            </div>
        </div>
    );
};

export default AttemptHistory;
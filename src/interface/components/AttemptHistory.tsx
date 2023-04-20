import React from 'react';
import '../styles/PreviousAttemptStyles.css';

interface AttemptHistoryProps {
    attemptHistory: string[];
    gameComplete: boolean;
}

const AttemptHistory = (props: AttemptHistoryProps) => {
    return (
        <div className="attempts-list">
            <span className="attempts-list-title">Attempt History</span>
            {props.attemptHistory.map((attempt) => {
                return (
                    <div className="attempt">
                        {attempt}
                    </div>
                );
            })
            }
        </div>
    );
};

export default AttemptHistory;
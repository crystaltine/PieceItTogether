import React from 'react';
import Square from './SquarePreview';
import '../styles/PreviousAttemptStyles.css';

import { undoToString } from '../../utils/utils';

interface AttemptHistoryProps {
    attemptHistory: string[];
    gameComplete: boolean;
}

const AttemptHistory = (props: AttemptHistoryProps) => {
    return (
        <div className="attempts-list">
            <span className='attempts-list-title'>Previous Attempts</span>
            {props.attemptHistory.map((attempt) => {
                let currSquareCSSClass = "square-light";
                let display = undoToString(attempt);
                return (
                    <div className="grid">

                        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                            currSquareCSSClass = currSquareCSSClass === "square-light"? "square-dark" : "square-light";
                            return (
                                <div className="board-row">
                                    {display.slice(i*8, i*8+8).map((value, j) => {
                                        currSquareCSSClass = currSquareCSSClass === "square-light"? "square-dark" : "square-light";

                                        return (
                                            <Square
                                            value={value}
                                            CSSclass={currSquareCSSClass}/>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                );
            })
            }
        </div>
    );
};

export default AttemptHistory;
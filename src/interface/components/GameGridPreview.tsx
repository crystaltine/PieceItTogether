import React from 'react';
import SquarePreview from './SquarePreview';
import '../styles/PreviewBoardStyles.css'

interface GridProps {
    display: string[];
}

const GameGridPreview = (props: GridProps) => {
    let currSquareCSSClass = "square-light";
    return (
        <div className="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            currSquareCSSClass = currSquareCSSClass === "square-light"? "square-dark" : "square-light";
            return (
                <div className="board-row">
                    {props.display.slice(i*8, i*8+8).map((value, j) => {
                        currSquareCSSClass = currSquareCSSClass === "square-light"? "square-dark" : "square-light";

                        return (
                            <SquarePreview
                            value={value}
                            CSSclass={currSquareCSSClass}/>
                        );
                    })}
                </div>
            );
        })}
    </div>
    );
};

export default GameGridPreview;
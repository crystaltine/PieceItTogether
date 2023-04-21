import React from 'react';
import SquareSecondary from './SquareSecondary';
import '../styles/SecondaryBoardStyles.css'

interface GridProps {
    display: string[];
}

const GameGridSecondary = (props: GridProps) => {
    if (props.display.length === 0) {
        return (
            <div style={{
                "display": "flex",
                "justifyContent": "center",
                "alignItems": "center",
            }}>
                <div style={{
                    "position": "absolute",
                    "zIndex": "10",
                }}>No Previous Attempt!</div>
                <div style={{"filter": "brightness(0.3) contrast(0.9)",}}>
                    <GameGridSecondary display={Array(64).fill("")}/>
                </div>
            </div>
        )
    }

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
                            <SquareSecondary
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

export default GameGridSecondary;
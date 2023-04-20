import React from 'react';
import SquareSecondary from './SquareSecondary';
import '../styles/SecondaryBoardStyles.css'

interface GridProps {
    positionFEN: string;
}

function isNumeric(str: string) {
    return !isNaN(parseFloat(str))
}

function fenToBoard(fen: string) {
    let boardPosition: string[] = fen.split(" ")[0].split("/").join("").split("");
    for (let i = 0; i < boardPosition.length; i++) {
        if (isNumeric(boardPosition[i])) {
            boardPosition.splice(i, 1, ...Array(parseInt(boardPosition[i])).fill(""));
        }
    }
    return boardPosition;
}


const GameGridSecondary = (props: GridProps) => {

    let boardPosition = fenToBoard(props.positionFEN);
    let currSquareCSSClass = "square-light";

    return (
        <div className="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            currSquareCSSClass = currSquareCSSClass === "square-light"? "square-dark" : "square-light";
            return (
                <div className="board-row">
                    {boardPosition.slice(i*8, i*8+8).map((value, j) => {
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
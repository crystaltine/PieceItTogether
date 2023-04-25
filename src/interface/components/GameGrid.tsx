import React, { useEffect } from 'react';
import Square from './Square';
import '../styles/WrapperStyles.css'

interface GridProps {
    display: string[];
    handleMove: (squareID: number, piece: string) => void;
}

const GameGrid = (props: GridProps) => {
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
                                <Square
                                value={value}
                                handleClick={() => {
                                    props.handleMove(i*8+j, props.display[i][j]);
                                }}
                                CSSclass={currSquareCSSClass}/>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default GameGrid;
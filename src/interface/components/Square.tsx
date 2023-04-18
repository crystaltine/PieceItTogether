import React from 'react';
import '../styles/GridStyles.css'

interface SquareProps {
    value: string;
    handleClick: () => void;
    side_length: number;
}

const Square = (props: SquareProps) => {

    let cellClass: string = props.value === "X"? "cell-x" : props.value === "O"? "cell-o" : "cell-empty";

    return (
        <div className={cellClass} style={{width: `${props.side_length}px`, height: `${props.side_length}px`}} onClick={props.handleClick}>
        </div>
    );
};

export default Square;
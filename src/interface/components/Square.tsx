import React from 'react';
import '../styles/SquareStyles.css'
import pieceURLMap from '../pieceThemes';
// import boardURLMap from '../boardThemes';

interface SquareProps {
    value: string;
    CSSclass: string;
    handleClick: () => void;
}

const Square = (props: SquareProps) => {

    // Obfuscated squares - black & white
    if (props.value.slice(0, 3) === "obf") {
        return (
            <div className={`square square-obfuscated-${props.value.slice(4)}`} onClick={() => {
                props.handleClick();
                
                }}>
            </div>
        )
    }

    // Hint squares - Green, Yellow, Gray
    if (props.value.slice(0, 16) === "square-highlight") {

        return (props.value === ""?  (
            <div className={`square ${props.value.slice(0, 20)}`} onClick={props.handleClick}>
            </div>
        ) : (
            <div className={`square ${props.value.slice(0, 20)}`} onClick={props.handleClick}>
                <img className="board-piece-image" src={props.value !== ""? pieceURLMap("neo")[props.value[props.value.length - 1]] : ""} alt=''></img>
            </div>
        ))
    }
    
    let returnValue = props.value === ""?  (
        <div className={`square ${props.CSSclass}`} onClick={props.handleClick}>
        </div>
    ) : (
        <div className={`square ${props.CSSclass}`} onClick={props.handleClick}>
            <img className="board-piece-image" src={props.value !== ""? pieceURLMap("neo")[props.value] : ""} alt=''></img>
        </div>
    )

    return returnValue;
};

export default Square;
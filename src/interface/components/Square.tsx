import React from 'react';
import '../styles/SquareStyles.css'

interface SquareProps {
    value: string;
    CSSclass: string;
    handleClick: () => void;
}

interface stringToPieceImage {
    [key: string]: string;
}

const urlMap: stringToPieceImage = {
    "P": "https://www.chess.com/chess-themes/pieces/neo/150/wp.png",
    "R": "https://www.chess.com/chess-themes/pieces/neo/150/wr.png",
    "N": "https://www.chess.com/chess-themes/pieces/neo/150/wn.png",
    "B": "https://www.chess.com/chess-themes/pieces/neo/150/wb.png",
    "Q": "https://www.chess.com/chess-themes/pieces/neo/150/wq.png",
    "K": "https://www.chess.com/chess-themes/pieces/neo/150/wk.png",
    "p": "https://www.chess.com/chess-themes/pieces/neo/150/bp.png",
    "r": "https://www.chess.com/chess-themes/pieces/neo/150/br.png",
    "n": "https://www.chess.com/chess-themes/pieces/neo/150/bn.png",
    "b": "https://www.chess.com/chess-themes/pieces/neo/150/bb.png",
    "q": "https://www.chess.com/chess-themes/pieces/neo/150/bq.png",
    "k": "https://www.chess.com/chess-themes/pieces/neo/150/bk.png",
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
                <img className="board-piece-image" src={props.value !== ""? urlMap[props.value[props.value.length - 1]] : ""} alt=''></img>
            </div>
        ))
    }
    
    let returnValue = props.value === ""?  (
        <div className={`square ${props.CSSclass}`} onClick={props.handleClick}>
        </div>
    ) : (
        <div className={`square ${props.CSSclass}`} onClick={props.handleClick}>
            <img className="board-piece-image" src={props.value !== ""? urlMap[props.value] : ""} alt=''></img>
        </div>
    )

    return returnValue;
};

export default Square;
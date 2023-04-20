import React from 'react';
import '../styles/SecondaryBoardStyles.css'

interface SquareProps {
    value: string;
    CSSclass: string;
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

const SquareSecondary = (props: SquareProps) => {
    let returnValue = props.value === ""?  (
        <div className={`square-secondary ${props.CSSclass}`}>
        </div>
    ) : (
        <div className={`square-secondary ${props.CSSclass}`}>
            <img className="board-piece-image-secondary" src={props.value !== ""? urlMap[props.value]: ""} alt=''></img>
        </div>
    )

    return returnValue;
};

export default SquareSecondary;
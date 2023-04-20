import React from 'react';
import '../styles/PieceSelectionStyles.css'

interface PieceSelectionProps {
    submitClicked: (piece: string) => void;
    currSelected: string;
    gameComplete: boolean;
}

const PieceSelection = (props: PieceSelectionProps) => {

    const gameComplete = props.gameComplete;

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

    let whitePieces = ["P", "N", "B", "R", "Q", "K"];
    let blackPieces = ["p", "n", "b", "r", "q", "k"];
    return (
        <div className='piece-selector'>
            <div className="piece-selector-section">
                {whitePieces.map((piece) => {
                    return (
                        <div className={piece === props.currSelected? "piece-image selected" : "piece-image"} onClick={() => props.submitClicked(piece)}>
                            <img className="board-piece-image" src={urlMap[piece]} alt=''></img>
                        </div>
                    )
                })}
            </div>
            <div className="piece-selector-section">
                {blackPieces.map((piece) => {
                    return (
                        <div className={piece === props.currSelected? "piece-image selected" : "piece-image"} onClick={() => props.submitClicked(piece)}>
                            <img className="board-piece-image" src={urlMap[piece]} alt=''></img>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default PieceSelection;
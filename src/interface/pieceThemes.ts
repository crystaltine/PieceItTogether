interface stringToPieceImage {
    [key: string]: string;
}

const pieceURLMap = (themeName: string): stringToPieceImage => {
    return {
        "P": `https://www.chess.com/chess-themes/pieces/${themeName}/150/wp.png`,
        "R": `https://www.chess.com/chess-themes/pieces/${themeName}/150/wr.png`,
        "N": `https://www.chess.com/chess-themes/pieces/${themeName}/150/wn.png`,
        "B": `https://www.chess.com/chess-themes/pieces/${themeName}/150/wb.png`,
        "Q": `https://www.chess.com/chess-themes/pieces/${themeName}/150/wq.png`,
        "K": `https://www.chess.com/chess-themes/pieces/${themeName}/150/wk.png`,
        "p": `https://www.chess.com/chess-themes/pieces/${themeName}/150/bp.png`,
        "r": `https://www.chess.com/chess-themes/pieces/${themeName}/150/br.png`,
        "n": `https://www.chess.com/chess-themes/pieces/${themeName}/150/bn.png`,
        "b": `https://www.chess.com/chess-themes/pieces/${themeName}/150/bb.png`,
        "q": `https://www.chess.com/chess-themes/pieces/${themeName}/150/bq.png`,
        "k": `https://www.chess.com/chess-themes/pieces/${themeName}/150/bk.png`,
    }
}

export default pieceURLMap ;
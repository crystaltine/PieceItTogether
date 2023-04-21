function isNumeric(str: string) {
    return !isNaN(parseFloat(str))
}

const fenToBoard = (fen: string) => {
    let boardPosition: string[] = fen.split(" ")[0].split("/").join("").split("");
    for (let i = 0; i < boardPosition.length; i++) {
        if (isNumeric(boardPosition[i])) {
            boardPosition.splice(i, 1, ...Array(parseInt(boardPosition[i])).fill(""));
        }
    }
    return boardPosition;
}

const obfuscateBoard = (boardState: string[]) => {
    for (let i = 0; i < boardState.length; i++) {
        if (boardState[i] !== "") {
            boardState[i] = "obf-" + (["P", "N", "B", "R", "Q", "K"].includes(boardState[i])? "white" : "black");
        }
    }
    return boardState;
}

const URLizeFEN = (fen: string) => {
    return fen.split(" ").join("_").split("/").join("~");
}

const undoToString = (undostr: string) => {
    let li = undostr.split(",");
    return li;
}

export { fenToBoard, obfuscateBoard, URLizeFEN, undoToString };
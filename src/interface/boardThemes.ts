interface stringToBoardColor {
    [key: string]: string[];
}

const boardColorMap: stringToBoardColor = {
    "Green": ["#769656", "#eeeed2"],
    "Brown": ["#b58863", "#f0d9b5"],
    "Blue": ["#7ca0b8", "#dce3ea"],
    "Light": ["#ababab", "#dcdcdc"],
    "Orange": ["#d08b18", "#fce4b2"],
    "Purple": ["#8877b7", "#efefef"],
    "Red": ["#ba5546", "#f0d8bf"],
    "Tan": ["#d3a36a", "#edc9a2"],
    "Sky": ["#c2d7e2", "#efefef"],
}

const getBoardColors = (themeName: string) => {
    return boardColorMap[themeName];
}

export { boardColorMap, getBoardColors };
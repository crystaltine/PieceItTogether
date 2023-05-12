import React from 'react';
import '../styles/SquareStyles.css'
import pieceURLMap from '../pieceThemes';
import { getBoardColors } from '../boardThemes';

interface SquareProps {
    value: string;
    isDarkSquare: boolean;
    handleClick?: () => void;
    type: string;
    themes: string[];
    highlightIncomplete?: boolean;

    /**
     * @param value conveys info about the square display, possible examples: K, r, obf-black, square-highlight-blu P, square-highlight-yel b
     * @param CSSclass controls light square or dark square for squares with nothing on them
     * @param handleClick is the function is implemented in the `Game` component
     * @param type should be "", "-secondary", or "-preview"
     * @param themes [0] is the board theme, [1] is the piece theme
     */

}

const Square = (props: SquareProps) => {

    const darkSquareColor = getBoardColors(props.themes[0])[0];
    const lightSquareColor = getBoardColors(props.themes[0])[1];

    // Obfuscated squares - black & white
    if (props.value.slice(0, 3) === "obf") {
        return (
            <div
                className={`square${props.type} square-obfuscated-${props.value.slice(4)}${props.highlightIncomplete? " square-highlight-red" : ""}`}
                onClick={props.type === ""? props.handleClick : undefined}>
            </div>
        )
    }

    let className = `square${props.type}`
    // obf -> `square${props.type} square-obfuscated-${props.value.slice(4)}`
    // square-highlight -> `square${props.type} ${props.value.slice(0, 20)}`
    // else -> `square${props.type} ${props.CSSclass}`
    if (props.value.slice(0, 3) === "obf") {
        className += ` square-obfuscated-${props.value.slice(4)}`;
    } else if (props.value.slice(0, 16) === "square-highlight") {
        className += ` ${props.value.slice(0, 20)}`;
    }
    
    const squareColor = props.isDarkSquare? darkSquareColor : lightSquareColor;
    return (props.value === ""?  (
        <div 
            className={className}
            style={className === `square${props.type}`? {backgroundColor: squareColor} : {}}
            onClick={props.type === ""? props.handleClick : undefined}>
        </div>
    ) : (
        <div
            className={`${className} occupied-square`}
            style={className === `square${props.type}`? {backgroundColor: squareColor} : {}}
            onClick={props.type === ""? props.handleClick : undefined}>
            <img className={`board-piece-image${props.type}`} src={pieceURLMap(props.themes[1])[props.value[props.value.length - 1]]} alt=''></img>
        </div>
    ))
};

export default Square;
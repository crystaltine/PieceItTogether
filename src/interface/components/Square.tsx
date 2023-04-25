import React from 'react';
import '../styles/SquareStyles.css'
import pieceURLMap from '../pieceThemes';
// import boardURLMap from '../boardThemes';

interface SquareProps {
    value: string;
    CSSclass: string;
    handleClick?: () => void;
    type: string;

    /**
     * @param value conveys info about the square display, possible examples: K, r, obf-black, square-highlight-blu P, square-highlight-yel b
     * @param CSSclass controls light square or dark square for squares with nothing on them
     * @param handleClick is the function is implemented in the `Game` component
     * @param type should be "", "-secondary", or "-preview"
     */

}

const Square = (props: SquareProps) => {
    // Obfuscated squares - black & white
    if (props.value.slice(0, 3) === "obf") {
        return (
            <div className={`square${props.type} square-obfuscated-${props.value.slice(4)}`} onClick={props.type === ""? props.handleClick : undefined}>
            </div>
        )
    }

    let className;
    // obf -> `square${props.type} square-obfuscated-${props.value.slice(4)}`
    // square-highlight -> `square${props.type} ${props.value.slice(0, 20)}`
    // else -> `square${props.type} ${props.CSSclass}`
    if (props.value.slice(0, 3) === "obf") {
        className = `square${props.type} square-obfuscated-${props.value.slice(4)}`;
    } else if (props.value.slice(0, 16) === "square-highlight") {
        className = `square${props.type} ${props.value.slice(0, 20)}`;
    } else {
        className = `square${props.type} ${props.CSSclass}`;
    }

    return (props.value === ""?  (
        <div className={className} onClick={props.type === ""? props.handleClick : undefined}>
        </div>
    ) : (
        <div className={className} onClick={props.type === ""? props.handleClick : undefined}>
            <img className={`board-piece-image${props.type}`} src={pieceURLMap("neo")[props.value[props.value.length - 1]]} alt=''></img>
        </div>
    ))
};

export default Square;
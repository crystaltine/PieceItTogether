import React from 'react';
import '../styles/EvalBarStyles.css';

interface EvalbarProps {
    value: number; // number (0.0 for tic tac toe) or M<mate in m moves> if win for either side
}

function clamp(num: number, min: number, max: number) {
    return num <= min? min : num >= max? max : num;
}

/**
 * Given an eval number (MUST BE CP, DOESNT HANDLE MATES)
 * returns a percentage (as number from 0-100) to fill the eval bar.
 */
function calcEvalFill(val: number): number {
    return clamp((1.3*Math.tanh(0.02*val*(Math.abs(val)+7))+1)/2 * 100, -95, 95);
}

/**
 * Eval measured in centipawns.
 * 
 * Mate evaluation format:
 * white mate: 10,000 + # of moves to mate
 * black mate: -10,000 - # of moves to mate
 * 
 * e.g.: +M3 = 10003, -M17 = -10017
 */
const EvalBar = (props: EvalbarProps) => {

    const [fillHeight, setFillHeight] = React.useState<string>("50%");
    const [fillClass, setFillClass] = React.useState<string>("black-eval-number");
    const [evalDisplay, setEvalDisplay] = React.useState<string>("~");

    React.useEffect(() => {
        setFillClass(props.value >= 0.0? "black-eval-number" : "white-eval-number"); 
    
        if (props.value >= 10000.0) {
            setFillHeight("100%");
            setEvalDisplay("M" + (props.value-10000));
        } else if (props.value <= -10000.0) {
            setFillHeight("0%");
            setEvalDisplay("M" + (-(props.value+10000)));
        } else {
            setFillHeight(calcEvalFill(props.value) + "%");
            setEvalDisplay(Math.abs(props.value).toFixed(props.value >= 10.0? 0 : 1));
        }
        console.log(`useeffect ran inside Evalbar, value: ${props.value}`);
    }, [props.value]);

    return (
        <div className="eval-bar">
            <div style={{height: fillHeight}} className="eval-bar-height"></div>
            <span className={fillClass}>{evalDisplay}</span>
        </div>
    );
};

export default EvalBar;
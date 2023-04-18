import React from 'react';
import GameGrid from './GameGrid';
import EvalBar from './EvalBar';
import Square from './Square';
import getEvaluation from '../../engine/evaluation';
import getWinningLines from '../../engine/generateLinesToCheck';
import PieceSelection from './PieceSelection';

interface GameProps {
    position: string;
}

const Game = (props: GameProps) => {

    const [grid, setGrid] = React.useState<string[]>(Array(props.gridSize).fill(""));
    const [currPlayer, setCurrPlayer] = React.useState<string>("X");
    const [evaluation, setEvaluation] = React.useState<number>(0.0);

    return (
        <div>
            <div className="grid-wrapper">
                <GameGrid grid={grid} setGrid={setGrid} nextPlayer={currPlayer} setPlayer={setCurrPlayer} handleMove={getEvalAfterMove}/>
                <EvalBar value={evaluation}/>
            </div>
        </div>
    );
};

export { Game };
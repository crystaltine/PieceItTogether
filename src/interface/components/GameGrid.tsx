import Square from './Square';
import '../styles/WrapperStyles.css'

interface GridProps {
    display: string[];
    handleMove: (squareID: number, piece: string) => void;
    type: string;
    themes: string[]
    highlightIncomplete?: boolean;
}

const GameGrid = (props: GridProps) => {
    return (
        <div className="grid">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                return (
                    <div className="board-row">
                        {props.display.slice(i*8, i*8+8).map((value, j) => {

                            return (
                                <Square
                                highlightIncomplete={props.highlightIncomplete}
                                value={value}
                                handleClick={(props.type === ""? () => props.handleMove(i*8+j, props.display[i][j]) : undefined)}
                                type={props.type}
                                isDarkSquare={(i+j)%2 === 1}
                                themes={props.themes}/>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default GameGrid;
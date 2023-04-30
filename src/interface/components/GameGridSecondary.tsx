import '../styles/SquareStyles.css'
import Square from './Square';

interface GridProps {
    display: string[];
    attemptIndex: number;
    themes: string[];
}

const GameGridSecondary = (props: GridProps) => {
    if (props.display.length === 0) {
        return (
            <div style={{
                "display": "flex",
                "justifyContent": "center",
                "alignItems": "center",
            }}>
                <div style={{"filter": "brightness(0.3) contrast(0.85)",}}>
                    <GameGridSecondary attemptIndex={-1} display={Array(64).fill("")} themes={props.themes}/>
                </div>
            </div>
        )
    }
    return (
        <div className='focused-attempt-container'>
            <span style={{
                            "color": "#eeeeff",
                            "textAlign": "center",
                            "margin": "4px 0px",
                            "fontFamily": "Lexend, Rubik",
                            "fontSize": "18px",
                            "fontWeight": "600",
                        }}> {props.attemptIndex === -1? "No Attempts Yet!" : `Attempt ${props.attemptIndex+1}`} </span>
            <div className="grid">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                return (
                    <div className="board-row">
                        {props.display.slice(i*8, i*8+8).map((value, j) => {

                            return (
                                <Square
                                value={value}
                                isDarkSquare={(i+j)%2 === 0}
                                type="-secondary"
                                themes={props.themes}/>
                            );
                        })}
                    </div>
                );
            })}
            </div>
        </div>
    );
};

export default GameGridSecondary;
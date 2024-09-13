
export type SquareOccupant = 
	| "P" | "N" | "B" | "R" | "Q" | "K"
	| "p" | "n" | "b" | "r" | "q" | "k";

/**
 * Performs wordle-like highlighting on a board guess.
 * 
 * Inputs: ["", "", "", "P", "R", ... etc] and ["", "", "R", "P", "k", ... etc]
 * Outputs: ["", "", "", "square-highlight-gre", "square-highlight-yel", ... etc]
 */
export function highlight_submission(subm: (SquareOccupant | "")[], ans: (SquareOccupant | "")[]): string[] {    

	const piece_frequencies: Record<SquareOccupant, number> = {
		"P": 0, "N": 0, "B": 0, "R": 0, "Q": 0, "K": 0,
		"p": 0, "n": 0, "b": 0, "r": 0, "q": 0, "k": 0,
	}
    
    // Note: a square/highlighted_grid[i] will be subscripted with .slice(-1)
    // because sometimes they take on values like "square-highlight-gre K" and "square-highlight-yel p"
    
    const hinted_indicies = new Set<number>();
    for (const square of ans) {
        if (square !== "") {
            piece_frequencies[square.slice(-1) as SquareOccupant] += 1;
		}
	}
            
    for (let i = 0; i < subm.length; i++) {
        if (subm[i].slice(0, 20) === "square-highlight-blu") {
			hinted_indicies.add(i);
		}
	}
    
    const highlighted_grid: string[] = [];
	for (let i = 0; i < subm.length; i++) {
		highlighted_grid.push("");
	}

	for (let i = 0; i < subm.length; i++) {
        if (i in hinted_indicies) {
            highlighted_grid[i] = "square-highlight-blu " + subm[i].slice(-1);
            piece_frequencies[subm[i].slice(-1) as SquareOccupant] -= 1;
		}
        else if (subm[i] !== "" && subm[i].slice(-1) === ans[i]) { // Correct place
            highlighted_grid[i] = "square-highlight-gre " + subm[i].slice(-1)
            piece_frequencies[subm[i].slice(-1) as SquareOccupant] -= 1
		}
	}
	for (let i = 0; i < subm.length; i++) {
        if (subm[i] !== "" && !(subm[i].slice(-1) === ans[i])) {
            if (piece_frequencies[subm[i].slice(-1) as SquareOccupant] > 0) { // Piece exists elsewhere but is not in correct place
                highlighted_grid[i] = "square-highlight-yel " + subm[i].slice(-1)
                piece_frequencies[subm[i].slice(-1) as SquareOccupant] -= 1
			}
            else { // Piece does not exist elsewhere in the answer
                highlighted_grid[i] = "square-highlight-gra " + subm[i].slice(-1)
			}
		}
	}

    return highlighted_grid;
}

const stockfishAPI = "https://stockfish.online/api/s/v2.php";
const depth = 12;

/**
 * Returns a number representing the evaluation of the given position.
 * Uses stockfishonline API.
 * 
 * Eval measured in centipawns.
 * 
 * Mate evaluation format:
 * white mate: 10,000 + # of moves to mate
 * black mate: -10,000 - # of moves to mate
 * 
 * e.g.: +M3 = 10003, -M17 = -10017
 */
export async function getEval(fen: string): Promise<number> {
	const res = await fetch(`${stockfishAPI}?fen=${fen}&depth=${depth}`)
	const data = await res.json();

	const cpNum = Number(data.evaluation);
	const mateNum = Number(data.mate);
	
	console.log(`cpnum: ${cpNum}, mateNum: ${mateNum}, data.eval: ${data.evaluation}, data.mate: ${data.mate}`);
	console.log(`getEval returning: ${cpNum ?? (mateNum > 0? (10000 + mateNum) : (-10000 - mateNum))}`);
	return (data.evaluation !== null? cpNum : (mateNum > 0? (10000 + mateNum) : (-10000 + mateNum))) || 0
}



// renderer process



export async function createHighScoresTable(db: any) {
    return new Promise<void>((resolve, reject) => {
        db.run(
            `
            CREATE TABLE IF NOT EXISTS highscores (
                score INTEGER
            )
            `,
            (err: Error) => {
                if (err) {
                    console.error('Error creating settings table:', err.message);
                    reject(err);
                } else {
                    console.log('Settings table initialized');
                    resolve();
                }
            }
        );
    });
}



export async function getLowestScore(db:any) {
    return new Promise<number>((resolve, reject) => {
        db.get('SELECT MIN(score) as minScore FROM highscores', (err: Error, row: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(row.minScore);
            }
        });
    });
}



export async function getScoreCount(db: any) {
    // Check the current number of rows in the highscores table
    return new Promise<number>((resolve, reject) => {
        db.get('SELECT COUNT(*) as count FROM highscores', (err: Error, row: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(row.count);
            }
        });
    });
}



export async function clearLowestScore(db: any, minScore: number) {
    // Remove the lowest score from the highscores table
    return new Promise<void>((resolve, reject) => {
        db.run('DELETE FROM highscores WHERE rowid IN (SELECT rowid FROM highscores WHERE score = ? LIMIT 1)', [minScore], (err: Error) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}



export async function insertHighScore(db: any, score: number) {
    // Insert the new score into the highscores table
    return new Promise<void>((resolve, reject) => {
        db.run('INSERT INTO highscores (score) VALUES (?)', [score], (err: Error) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
            });
        });
}



export async function updateHighScores(db: any, score: number): Promise<void> {

    try {
    
        const rowCount = await getScoreCount(db);
        // If there are already 10 scores, determine if the new score is among the top 10
        if (rowCount >= 10) {

            const minScore = await getLowestScore(db);
            if (score <= minScore) {
                console.log('Score is not in the top 10');
                return;
            } else {
                await clearLowestScore(db, minScore);
            }

        }
        
        insertHighScore(db, score);
        console.log('Score inserted successfully.');

    } catch (error) {

        console.error('Error inserting score:', (error as Error).message);
    
    }

}






export class Score {
    public score: string;
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;

    constructor(score: number, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.score = score.toString();
        this.canvas = canvas;
        this.ctx = ctx;
    }

    public update(score: number): void {
        let newScore = parseInt(this.score);
        newScore += score;
        this.score = newScore.toString();
    }

    public draw(): void {
        const padding = 10; 
        const textX = this.canvas.width - padding;
        const textY = this.canvas.height - padding;
    
        this.ctx.font = '36px Arial';
        this.ctx.textAlign = 'right';
        this.ctx.textBaseline = 'bottom';
        this.ctx.fillStyle = 'white';

        this.ctx.fillText(`Score: ${this.score}`, textX, textY);
    }
}









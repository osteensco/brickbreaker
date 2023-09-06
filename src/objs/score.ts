

// renderer process



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









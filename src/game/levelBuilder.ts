import { Brick } from "../objs/bricks";
import { BrickInfo } from "./levels";

// renderer process





export class Level {
    public _canvas: HTMLCanvasElement;
    public _ctx: CanvasRenderingContext2D;
    public _canvasWidth: number;
    public _canvasHeight: number;
    public pattern: Array<Array<BrickInfo>>;
    public bricks: Array<Brick>;
    public nbr: string;

    constructor(levelNumber: string, pattern: Array<Array<BrickInfo>>, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.nbr = levelNumber;
        this._canvas = canvas;
        this._ctx = ctx;
        this._canvasWidth = canvas.width;
        this._canvasHeight = canvas.height;
        this.pattern = pattern;
        this.bricks = [];
        this.build(canvas)
    }
  
    public build(canvas: HTMLCanvasElement): void {
        const rowCount = this.pattern.length;
        const colCount = this.pattern[0].length;
  
          // Calculate the size of each brick based on canvas dimensions, pattern size, and padding
        const padding = 2; 
        const availableWidth = canvas.width;
        const availableHeight = canvas.height / 2;
        const brickWidth = (availableWidth - (colCount - 1) * padding) / colCount;
        const brickHeight = (availableHeight - (rowCount - 1) * padding) / rowCount;

        // Calculate the offset to center the brick arrangement in the top half of the canvas
        const offsetX = (canvas.width - (colCount * brickWidth + (colCount - 1) * padding));
        const offsetY = canvas.height / 2 - (rowCount * brickHeight + (rowCount - 1) * padding);

        for (let row = 0; row < rowCount; row++) {
            for (let col = 0; col < colCount; col++) {
                const brickInfo = this.pattern[row][col];
                const brickX = col * (brickWidth + padding) + offsetX;
                const brickY = row * (brickHeight + padding) + offsetY;
        
                if (brickInfo.health !== 0) {
                    const brick = new Brick(brickX, brickY, brickWidth, brickHeight, brickInfo.color || 'default-color', brickInfo.health);
                    this.bricks.push(brick);
                }
            }
        }
    }

    public displayLevel(): void {
        const padding = 10; 
        const textX = padding;
        const textY = this._canvas.height - padding;
    
        this._ctx.font = '36px Arial';
        this._ctx.textAlign = 'left';
        this._ctx.textBaseline = 'bottom';
        this._ctx.fillStyle = 'white';

        this._ctx.fillText(`Level: ${this.nbr}`, textX, textY);
    }

    public draw(): void {
        this.bricks.forEach(brick => {
            brick.draw(this._ctx);
        });
        this.displayLevel();
    }

    public updateSize(canvas: HTMLCanvasElement): void {
        this.bricks.forEach(brick => {
            
            const oldCanvasWidth = this._canvasWidth;
            const oldCanvasHeight = this._canvasHeight;

            this._canvasWidth = canvas.width;
            this._canvasHeight = canvas.height;
    
            brick.x = (brick.x / oldCanvasWidth) * this._canvasWidth;
            brick.y = (brick.y / oldCanvasHeight) * this._canvasHeight;
            brick.width = (brick.width / oldCanvasWidth) * this._canvasWidth;
            brick.height = (brick.height / oldCanvasHeight) * this._canvasHeight;
            
        });
    }



}



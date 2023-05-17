import { Brick } from "../objs/bricks";
import { BrickInfo } from "./levels";

// renderer process





export class Level {
    public _canvas: HTMLCanvasElement;
    public _ctx: CanvasRenderingContext2D;
    public pattern: Array<Array<BrickInfo>>;
    public bricks: Array<Brick>;

    constructor(pattern: Array<Array<BrickInfo>>, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this._canvas = canvas;
        this._ctx = ctx;
        this.pattern = pattern;
        this.bricks = [];
        this.build(canvas, ctx)
    }
  
    public build(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
        const rowCount = this.pattern.length;
        const colCount = this.pattern[0].length;
  
          // Calculate the size of each brick based on canvas dimensions, pattern size, and padding
        const padding = 2; // Adjust the padding value as needed
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

    public draw(): void {
        this.bricks.forEach(brick => {
            brick.draw(this._ctx);
        });
    }

    public updateSize(): void {
        this.bricks.forEach(brick => {
            return
        });
    }



}



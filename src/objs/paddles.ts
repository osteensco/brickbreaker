

// renderer process



export class Paddle {

    private readonly _ctx: CanvasRenderingContext2D;
    private _canvasWidth: number;
    private _canvasHeight: number;
  
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public speed: number;
  
    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {

        this._ctx = ctx;
        this._canvasWidth = canvas.width;
        this._canvasHeight = canvas.height;
    
        this.x = this._canvasWidth / 2; // start in the middle of the canvas horizontally
        this.y = this._canvasHeight - this._canvasHeight / 10; // start near the bottom of the canvas
        this.width = this._canvasWidth / 5; // set the paddle width to one-fifth of the canvas width
        this.height = this._canvasHeight / 30; // set the paddle height to one-thirtieth of the canvas height
        this.speed = this._canvasWidth / 2; // set the paddle speed to move one-half of the canvas width per second
    }
  
    public draw(): void {
        this._ctx.fillStyle = "#0095DD";
        this._ctx.fillRect(
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height
        );
    }
  
    public updateSize(canvas: HTMLCanvasElement): void {
        this._canvasWidth = canvas.width;
        this._canvasHeight = canvas.height;
    
        this.x = this._canvasWidth / 2; // start in the middle of the canvas horizontally
        this.y = this._canvasHeight - this._canvasHeight / 10; // start near the bottom of the canvas
        this.width = this._canvasWidth / 5; // set the paddle width to one-fifth of the canvas width
        this.height = this._canvasHeight / 30; // set the paddle height to one-thirtieth of the canvas height
        this.speed = this._canvasWidth / 2; // set the paddle speed to move one-half of the canvas width per second
    }
   
    public moveLeft() {
		this.x -= this.speed;
    }
  
    public moveRight() {
		this.x += this.speed;
    }
  



}

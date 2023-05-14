

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
    
        this.x = this.setPosX();
        this.y = this.setPosY();
        this.width = this.setWidth();
        this.height = this.setHeight();
        this.speed = this.setSpeed();

        this.setMovementListeners();
    }
  
    public draw(): void {
        this._ctx.clearRect(this.x, this.y, this.width, this.height);
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
    
        this.x = this.setPosX();
        this.y = this.setPosY();
        this.width = this.setWidth();
        this.height = this.setHeight();
        this.speed = this.setSpeed();
    }
   
    public setPosX(): number {
        return this._canvasWidth / 2; // set paddle in the middle of the canvas horizontally
    }

    public setPosY(): number {
        return this._canvasHeight - this._canvasHeight / 10; // set paddle near the bottom of the canvas
    }

    public setWidth(): number {
        return this._canvasWidth / 15; // set the paddle width to 1/13 of the canvas width
    }

    public setHeight(): number {
        return this._canvasHeight / 100; // set the paddle height to 1/80 of the canvas height
    }

    public setSpeed(): number {
        return this._canvasWidth / 2; // set the paddle speed to move one-half of the canvas width per second
    }

    public moveLeft() {
		this.x -= this.speed;
    }
  
    public moveRight() {
		this.x += this.speed;
    }
  


    public setMovementListeners(): void {
        document.addEventListener('keydown', (event) => {
            if (event.code === 'ArrowLeft') {
              this.moveLeft()
            } else if (event.code === 'ArrowLeft') {
              this.moveRight()
            }
          });
    }


}

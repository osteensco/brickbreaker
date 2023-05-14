

// renderer process



export class Paddle {
    
    private readonly _ctx: CanvasRenderingContext2D;
    private _canvasWidth: number;
    private _canvasHeight: number;
    public keys: {[key: string]: boolean};
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public speed: number;
  
    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.keys = {};
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
        
        this.move();

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
        // set paddle in the middle of the canvas horizontally
        return this._canvasWidth / 2; 
    }

    public setPosY(): number {
        // set paddle near the bottom of the canvas
        return this._canvasHeight - this._canvasHeight / 10; 
    }

    public setWidth(): number {
        // set the paddle width to 1/13 of the canvas width
        return this._canvasWidth / 15; 
    }

    public setHeight(): number {
        // set the paddle height to 1/80 of the canvas height
        return this._canvasHeight / 100; 
    }

    public setSpeed(): number {
        // set the paddle speed to move one-half of the canvas width per second
        return (this._canvasWidth / 4) / 16.7; 
    }

    public moveLeft() {
		this.x -= this.speed;
    }
  
    public moveRight() {
		this.x += this.speed;
    }
  
    public move() {
        if (this.keys['ArrowLeft']) {
            this.moveLeft()
          } else if (this.keys['ArrowRight']) {
            this.moveRight()
          }
    }

    public setMovementListeners(): void {
    
        window.addEventListener('keydown', (event: KeyboardEvent) => {
            this.keys[event.code] = true;
        });
        window.addEventListener('keyup', (event: KeyboardEvent) => {
            this.keys[event.code] = false;
        }); 
          
    }


}

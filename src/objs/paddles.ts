

// renderer process

import { drawBall } from "../utils/helpers";



export class Paddle {
    
    private readonly _ctx: CanvasRenderingContext2D;
    private _canvasWidth: number;
    private _canvasHeight: number;
    public keys: {[key: string]: boolean};
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    private baseSpeed: number;
    public speed: number;
    public lives: number;
    public game: any;
    public moving: boolean;
    public moveLeftKey: string;
    public moveRightKey: string;
  
    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, game: any) {
        this.moving = false;
        this.keys = {};
        this._ctx = ctx;
        this._canvasWidth = canvas.width;
        this._canvasHeight = canvas.height;
        this.x = this.setPosX();
        this.y = this.setPosY();
        this.width = this.setWidth();
        this.height = this.setHeight();
        this.baseSpeed = game.settings.paddleSpeed;
        this.speed = this.setSpeed(this.baseSpeed);
        this.lives = game.settings.extraLives;
        this.game = game;
        this.setMovementListeners();
        this.moveLeftKey = game.settings.paddleLeftControl;
        this.moveRightKey = game.settings.paddleRightControl;
    }
  
    public draw(): void {
        
        this.displayLives();
        if (!this.game.message.show) {
            this.move();
        }

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
        this.speed = this.setSpeed(this.baseSpeed);
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
        
        return this._canvasWidth / 15; 
    }

    public setHeight(): number {
        
        return this._canvasHeight / 100; 
    }

    public setSpeed(speed: number): number {
        
        return ((this._canvasWidth / 5) / 16.7) * speed; 
    }

    public moveLeft(): void {
		if (this.x - this.width / 2 > 0) {
            this.x -= this.speed;
        } 
    }
  
    public moveRight(): void {
		if (this.x + this.width / 2 < this._canvasWidth) {
            this.x += this.speed;
        }
    }
  
    public move(): void {
        if (this.keys[this.moveLeftKey]) {
            this.moveLeft()
          } else if (this.keys[this.moveRightKey]) {
            this.moveRight()
          }
    }

    public setMovementListeners(): void {
    
        window.addEventListener('keydown', (event: KeyboardEvent) => {
            this.keys[event.code] = true;
            this.moving = true;
        });
        window.addEventListener('keyup', (event: KeyboardEvent) => {
            this.keys[event.code] = false;
            this.moving = false;
        }); 
          
    }

    public displayLives(): void {
        const padding = 10; 
        const textX = padding*3 + this._ctx.measureText('Level: ___').width;
        const textY = this._canvasHeight - padding;
        const ballRadius = 10;
        const ballY = textY-padding-ballRadius;
    
        for (let i = 0; i < this.lives; i++) {
            const ballX = textX + i * (2 * (ballRadius + padding));
            drawBall(ballX, ballY, ballRadius, this._ctx);
        }
        
    }
    


}

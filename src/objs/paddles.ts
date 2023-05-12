import { Ball } from "./balls";

export class Paddle {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public speed: number;
  
    
    constructor(x: number, y: number, width: number, height: number, speed: number) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.speed = speed;
    }
  
    // Draw the paddle on the canvas
    public draw() {
		const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
		const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
		ctx.fillStyle = "#0095DD";
		ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  
    // Move the paddle left or right
    public moveLeft() {
		this.x -= this.speed;
    }
  
    public moveRight() {
		this.x += this.speed;
    }
  
    // Check if the ball has collided with the paddle
    public collidesWith(ball: Ball): boolean {
		return (
			ball.x + ball.radius > this.x &&
			ball.x - ball.radius < this.x + this.width &&
			ball.y + ball.radius > this.y &&
			ball.y - ball.radius < this.y + this.height
		);
    }
}

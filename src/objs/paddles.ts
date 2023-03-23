import { Ball } from "./balls";

  export class Paddle {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
  
    constructor(x: number, y: number, width: number, height: number, speed: number) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.speed = speed;
    }
  
    // Draw the paddle on the canvas
    draw(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = "#0095DD";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  
    // Move the paddle left or right
    moveLeft() {
      this.x -= this.speed;
    }
  
    moveRight() {
      this.x += this.speed;
    }
  
    // Check if the ball has collided with the paddle
    collidesWith(ball: Ball): boolean {
      return (
        ball.x + ball.radius > this.x &&
        ball.x - ball.radius < this.x + this.width &&
        ball.y + ball.radius > this.y &&
        ball.y - ball.radius < this.y + this.height
      );
    }
  }

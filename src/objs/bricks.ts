import { Ball } from "./balls";

export class Brick {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    destroyed: boolean;
  
    constructor(x: number, y: number, width: number, height: number, color: string) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
      this.destroyed = false;
    }
  
    // Draw the brick on the canvas
    draw(ctx: CanvasRenderingContext2D) {
      if (!this.destroyed) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
    }
  
    // Check if the ball has collided with the brick
    collidesWith(ball: Ball): boolean {
      if (this.destroyed) {
        return false;
      }
  
      // Check for overlap between the ball and the brick
      return (
        ball.x + ball.radius > this.x &&
        ball.x - ball.radius < this.x + this.width &&
        ball.y + ball.radius > this.y &&
        ball.y - ball.radius < this.y + this.height
      );
    }
  }
  
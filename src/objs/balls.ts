import { Paddle } from './paddles';

export class Ball {
  private _x: number;
  private _y: number;
  private _dx: number;
  private _dy: number;
  private _radius: number;
  private _despawn: boolean;

  constructor(x: number, y: number, dx: number, dy: number, radius: number) {
    this._x = x;
    this._y = y;
    this._dx = dx;
    this._dy = dy;
    this._radius = radius;
    this._despawn = false;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
  }

  public move(): void {
    this._x += this._dx;
    this._y += this._dy;
  }

  public collideWithPaddle(paddle: Paddle): void {
    if (
      this._y + this._dy > paddle.y &&
      this._y + this._dy < paddle.y + paddle.height &&
      this._x + this._dx > paddle.x &&
      this._x + this._dx < paddle.x + paddle.width
    ) {
      this._dy = -this._dy;
    }
  }

  public collideWithWall(width: number, height: number): void {
    if (this._x + this._dx > width - this._radius || this._x + this._dx < this._radius) {
      this._dx = -this._dx;
    }

    if (this._y + this._dy < this._radius) {
      this._dy = -this._dy;
    } else if (this._y + this._dy > height - this._radius) {
      this._despawn = true;
    }
  }

  public get x(): number {
    return this._x;
  }

  public get y(): number {
    return this._y;
  }

  public get radius(): number {
    return this._radius;
  }

  public get despawn(): boolean {
    return this._despawn
  }

}

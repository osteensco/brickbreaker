import { Brick } from './bricks';
import { Paddle } from './paddles';



// renderer process



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

			// Potential for improved collision physics. This should allow the player to alter the ball trajectory based on paddle movement. 
			// Paddle object will need to track actual speed based on x position in previous frame(s).
			// ex. if ball is still this value is 0, if moving it should calculate to be equal to paddle.speed since this value controls x axis velocity.

			// // Calculate the angle of reflection based on where the ball hits the paddle
			// const relativeIntersectX = this._x - (paddle.x + paddle.width / 2);
			// const normalizedRelativeIntersectX = relativeIntersectX / (paddle.width / 2);
			// const bounceAngle = normalizedRelativeIntersectX * Math.PI / 3;
			// // Calculate the new velocity of the ball based on the angle of reflection and the paddle speed
			// const speed = Math.sqrt(this._dx * this._dx + this._dy * this._dy);
			// const direction = Math.atan2(this._dy, this._dx);
			// const newDirection = Math.PI - bounceAngle - direction;
			// const newDx = Math.abs(speed * Math.cos(newDirection)) * (this._dx > 0 ? 1 : -1);
			// const newDy = -Math.abs(speed * Math.sin(newDirection));
			// // Apply a boost to the ball's horizontal speed based on the paddle's lateral speed
			// const boost = Math.abs(paddle.currentVelocity) / 20;
			// const sign = Math.sign(paddle.currentVelocity);
			// this._dx = newDx + boost * sign;
			// this._dy = newDy;
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

	
	public collideWithBrick(brick: Brick): void {
		if (
			this.x + this.radius > brick.x &&
			this.x - this.radius < brick.x + brick.width &&
			this.y + this.radius > brick.y &&
			this.y - this.radius < brick.y + brick.height
		) {
			brick.hit();
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

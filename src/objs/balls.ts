import { Brick } from './bricks';
import { Paddle } from './paddles';



// renderer process



export class Ball {
    private readonly _ctx: CanvasRenderingContext2D;
    private _canvasWidth: number;
    private _canvasHeight: number;
    public keys: {[key: string]: boolean};
    public paddle: Paddle;
	public x: number;
	public y: number;
    public vel: number;
	public dx: number;
	public dy: number;
	public radius: number;
	public despawn: boolean;
    public stuck: boolean;

	constructor(player: Paddle, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.keys = {};
        this.paddle = player;
        this._ctx = ctx;
        this._canvasWidth = canvas.width;
        this._canvasHeight = canvas.height;
        this.radius = this.setRadius();
		this.x = canvas.width / 2;
		this.y = this.setPosY();
        this.vel = (this._canvasWidth / 10) / 16.7;
		this.dx = (Math.random() - 1) * this.vel; 
        this.dy = (Math.random() - 1) * this.vel; 
		this.despawn = false;
        this.stuck = true;

        this.setMovementListeners()
	}

	public draw(): void {
        

        this.move();
        
        this._ctx.beginPath();
        this._ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this._ctx.fillStyle = 'red';
        this._ctx.fill();
        this._ctx.closePath();
        
		
	}

    public updateSize(canvas: HTMLCanvasElement): void {
        const oldCanvasWidth = this._canvasWidth;
        const oldCanvasHeight = this._canvasHeight;

        this._canvasWidth = canvas.width;
        this._canvasHeight = canvas.height;

        this.radius = this.setRadius();
        this.x = (this.x / oldCanvasWidth) * this._canvasWidth;
        this.y = (this.y / oldCanvasHeight) * this._canvasHeight;
        this.vel = (this.vel / oldCanvasWidth) * this._canvasWidth;
        this.dx = (this.dx / oldCanvasWidth) * this._canvasWidth;
        this.dy = (this.dy / oldCanvasHeight) * this._canvasHeight;
        
    }

	public move(): void {

        this.collideWithPaddle();
        this.collideWithWall();

        if (!this.stuck) {
            this.x += this.dx;
		    this.y += this.dy;
        } else if (this.keys['ArrowLeft']) {
            this.moveLeft()
        } else if (this.keys['ArrowRight']) {
            this.moveRight()
        } else if (this.keys['Space']) {
            this.stuck = false;
        }

    }
		
	

    public moveLeft(): void {
		if (
            this.x - this.radius > 0 &&
            this.paddle.x - this.paddle.width / 2 > - this.paddle.speed 
        ) {
            this.x -= this.paddle.speed;
        }
    }
  
    public moveRight(): void {
		if (
            this.x + this.radius < this._canvasWidth &&
            this.paddle.x + this.paddle.width / 2 < this._canvasWidth + this.paddle.speed
        ) {
            this.x += this.paddle.speed;
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

	public collideWithPaddle(): void {
		if (
            !this.stuck &&
			this.y + this.dy > this.paddle.y - this.paddle.height / 2 &&
			this.y + this.dy < this.paddle.y + this.paddle.height / 2 &&
			this.x + this.dx > this.paddle.x - this.paddle.width / 2 &&
			this.x + this.dx < this.paddle.x + this.paddle.width / 2
		) {
			this.dy = -this.dy;

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

	public collideWithWall(): void {
		if (this.x + this.dx > this._canvasWidth - this.radius || this.x + this.dx < this.radius) {
			this.dx = -this.dx;
		}

		if (this.y + this.dy < this.radius) {
			this.dy = -this.dy;
		} else if (this.y + this.dy > this._canvasHeight - this.radius) {
			this.despawn = true;
		}
	}

	
	public collideWithBrick(brick: Brick): void {
		if (
			this.x + this.radius > brick.x &&
			this.x - this.radius < brick.x + brick.width &&
			this.y + this.radius > brick.y &&
			this.y - this.radius < brick.y + brick.height
		) {
            const previousBallCenterX = this.x - this.dx;
            const previousBallCenterY = this.y - this.dy;
        
            if (
                previousBallCenterX + this.radius <= brick.x ||
                previousBallCenterX - this.radius >= brick.x + brick.width
            ) {
                // Ball hits a vertical surface of the brick
                this.dx = -this.dx;
            } else if (
              previousBallCenterY + this.radius <= brick.y ||
              previousBallCenterY - this.radius >= brick.y + brick.height
            ) {
                // Ball hits a horizontal surface of the brick
                this.dy = -this.dy;
            } else {
                // Ball hits a corner of the brick
                this.dx = -this.dx;
                this.dy = -this.dy;
            }
        
            brick.hit();
        }
	}


    public setPosY(): number {
        // set ball slightly above the paddle
        return (this._canvasHeight - this._canvasHeight / 10) - (this.paddle.height*2); 
    }

	public setRadius(): number {
        return this._canvasWidth / 110;
    }

}

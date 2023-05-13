

// renderer process



export class Brick {
    public x: number;
	public y: number;
    public width: number;
    public height: number;
    public color: string;
    public destroyed: boolean;
	public hp: number;
  
    constructor(x: number, y: number, width: number, height: number, color: string, hp: number) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
		this.hp = hp;
		this.destroyed = false;
    }



    public draw(ctx: CanvasRenderingContext2D): void {
		if (!this.destroyed) {
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
    }


	public hit(): void {
		this.hp -= 1;
		if (this.hp <= 0) {
			this.destroyed = true;
		}
	}




  }
  
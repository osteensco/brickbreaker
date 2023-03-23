export class Drop {
    private _x: number;
    private _y: number;
    private _vel: number;
    private _radius: number;
    private _color: string;
  
    constructor(x: number, y: number, vel: number, radius: number, color: string) {
      this._x = x;
      this._y = y;
      this._vel = vel;
      this._radius = radius;
      this._color = color;
    }
  
    public draw(ctx: CanvasRenderingContext2D): void {
      ctx.beginPath();
      ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2);
      ctx.fillStyle = this._color;
      ctx.fill();
      ctx.closePath();
    }
  
    public move(): void {
      this._y += this._vel;
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
  
    public get color(): string {
      return this._color;
    }
  }
  
export class Square {
  private z = 10;

  constructor(
    private ctx: CanvasRenderingContext2D,
    public x: number,
    public y: number,
    private color: string,
    public direction: string,
    public age: number,
    public createDir: string
  ) { }

  move() {
    switch (this.direction) {
      case 'up':
        this.y--;
        break;
      case 'down':
        this.y++;
        break;
      case 'left':
        this.x--;
        break;
      case 'right':
        this.x++;
        break;
      default:
        break;
    }
    this.draw(this.color);
  }

  private draw(color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(this.z * this.x, this.z * this.y, this.z, this.z);
  }
}

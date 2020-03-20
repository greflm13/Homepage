export class Square {
  private size = 10;

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
    this.draw();
  }

  private draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.size * this.x, this.size * this.y, this.size, this.size);
  }
}

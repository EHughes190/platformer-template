export class Platform {
  height: number;
  width: number;
  x: number;
  y: number;
  color: string;

  constructor(x: number, y: number) {
    this.height = 10;
    this.width = 100;
    this.x = x;
    this.y = y;
    this.color = "blue";
  }

  update() {}

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

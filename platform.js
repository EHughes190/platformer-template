export class Platform {
  constructor(x, y) {
    this.height = 10;
    this.width = 100;
    this.x = x;
    this.y = y;
    this.color = "blue";
  }

  update() {}

  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

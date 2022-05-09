window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.height = 500;
  canvas.width = 1000;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
    }

    update() {}

    draw(context) {}
  }

  const game = new Game(canvas.width, canvas.height);

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate);
  };

  animate();
});

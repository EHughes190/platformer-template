import { InputHandler } from "./input.js";
import { Platform } from "./platform.js";
import { Player } from "./player.js";

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.height = 500;
  canvas.width = 1000;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.numberOfPlatforms = 3;
      this.platforms = [];
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.platform = new Platform(300, 475);
    }

    init() {
      //platforms
      // for (let i = 0; i < this.numberOfPlatforms; i++) {
      //   const x = Math.floor(Math.random() * 300) + 100;
      //   const y = Math.floor(Math.random() * 450) + 100;
      //   this.platforms.push(new Platform(x, y));
      //   console.log("hey");
      // }
    }

    update() {
      this.player.update(this.input.keys);
    }

    draw(context) {
      this.player.draw(context);
      this.platform.draw(context);
      // this.platforms.forEach((platform) => {
      //   platform.draw(context);
      // });
    }
  }

  const game = new Game(canvas.width, canvas.height);
  game.init();

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate);
  };

  animate();
});

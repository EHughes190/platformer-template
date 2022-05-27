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
    }

    init() {
      //platforms
      this.platforms.push(new Platform(100, 350));
      this.platforms.push(new Platform(300, 350));
      this.platforms.push(new Platform(500, 350));
      this.platforms.push(new Platform(200, 250));
    }

    update(deltaTime) {
      this.player.update(this.input.keys, deltaTime);
    }

    draw(context) {
      this.player.draw(context);
      this.platforms.forEach((platform) => {
        platform.draw(context);
      });
    }
  }

  const game = new Game(canvas.width, canvas.height);
  game.init();

  //FPS. requestAnimationFrame has a timeStamp data which it passes to animate automatically. We can use this value to calculate deltaTime (in ms) and use this to change FPS for sprite animations. This means FPS of the screen and animations is separate
  let lastTime = 0;

  const animate = (timeStamp) => {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    game.draw(ctx);
    game.update(deltaTime);
    requestAnimationFrame(animate);
  };

  animate(0);
});

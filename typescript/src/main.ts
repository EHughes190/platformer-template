import { InputHandler } from "./input.js";
import { Platform } from "./platform.js";
import { Player } from "./player.js";

export type Game = {
  width: number;
  height: number;
  platforms: Platform[];
  player: Player;
  input: InputHandler;
};

window.addEventListener("load", () => {
  const canvas = <HTMLCanvasElement>document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.height = 500;
  canvas.width = 1000;

  class Game {
    width: number;
    height: number;
    platforms: Platform[];
    player: Player;
    input: InputHandler;

    constructor(width: number, height: number) {
      this.width = width;
      this.height = height;
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

    update(deltaTime: number) {
      this.player.update(this.input.keys, deltaTime);
    }

    draw(context: CanvasRenderingContext2D) {
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

  //The workhorse of the game. Animate and request animation frame will loop this function, allowing us to re render and move objects in the game. game functions called here for draw and update.
  const animate = (timeStamp: number) => {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx?.clearRect(0, 0, canvas.width, canvas.height);

    if (ctx) {
      game.draw(ctx);
    }
    game.update(deltaTime);
    requestAnimationFrame(animate);
  };

  animate(0);
});

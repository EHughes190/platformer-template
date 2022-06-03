//Registers player input and feeds to main game class.

import { Game } from "./main.js";

export type keys = {
  left: boolean;
  right: boolean;
  up: boolean;
};

export class InputHandler {
  game: Game;
  keys: keys;

  constructor(game: Game) {
    this.game = game;
    this.keys = {
      left: false,
      right: false,
      up: false,
    };

    window.addEventListener("keydown", (e) => {
      if (e.key === "w") {
        this.keys.up = true;
      } else if (e.key === "a") {
        this.keys.left = true;
      } else if (e.key === "d") {
        this.keys.right = true;
      }
    });
    window.addEventListener("keyup", (e) => {
      if (e.key === "w") {
        this.keys.up = false;
      } else if (e.key === "a") {
        this.keys.left = false;
      } else if (e.key === "d") {
        this.keys.right = false;
      }
    });
  }
}

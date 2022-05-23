import { Platform } from "./platform.js";
import { Idle, Running, Jumping, Falling } from "./playerStates.js";

export class Player {
  constructor(game) {
    this.game = game;
    this.height = 25;
    this.width = 25;
    this.x = 100;
    this.y = this.game.height;
    this.color = "white";
    this.vy = 0;
    this.gravity = 1;
    this.speed = 0;
    this.maxSpeed = 6;
    this.jumpHeight = 20;
    this.onPlatform = false;

    //STATE
    this.states = [
      new Idle(this),
      new Running(this),
      new Jumping(this),
      new Falling(this),
    ];
    this.currentState = this.states[0];
    this.currentState.enter();
  }

  update(input) {
    this.handleMovement(input);
    this.currentState.handleInput(input);
    this.checkCollisions();
  }

  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  isGrounded() {
    if (this.y >= this.game.height - this.height || this.onPlatform) {
      return true;
    } else {
      return false;
    }
  }

  handleMovement(input) {
    //HORIZONTAL MOVEMENT
    this.x += this.speed;

    if (input.left) {
      this.speed = -this.maxSpeed;
    } else if (input.right) {
      this.speed = this.maxSpeed;
    } else {
      this.speed = 0;
    }

    //VERTICAL MOVEMENT
    this.y += this.vy;

    if (this.y + this.height + this.vy <= this.game.height) {
      this.vy += this.gravity;
      this.onPlatform = false;
    } else {
      this.vy = 0;
    }

    this.game.platforms.forEach((platform) => {
      if (
        this.y + this.height <= platform.y &&
        this.y + this.height + this.vy >= platform.y &&
        this.x + this.width >= platform.x &&
        this.x <= platform.x + platform.width
      ) {
        this.vy = 0;
        this.y = platform.y - this.height;
        this.onPlatform = true;
      }
    });

    if (this.isGrounded() && input.up) {
      this.vy -= this.jumpHeight;
      this.onPlatform = false;
    }
  }

  checkCollisions() {
    //x bounds
    if (this.x <= 0) this.x = 0;
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;
    //y bounds
    if (this.y + this.vy >= this.game.height - this.height) {
      this.y = this.game.height - this.height;
    }
  }

  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
    console.log(this.currentState, this.vy, this.onPlatform, this.isGrounded());
  }

  /**
   *
   * @param {Player} shapeA
   * @param {Platform} shapeB
   * @returns a string determining the colliding direction relative to shapeA
   */
  // colCheck(shapeA, shapeB) {
  //   // get the vectors to check against
  //   let vX = shapeA.x + shapeA.width / 2 - (shapeB.x + shapeB.width / 2),
  //     vY = shapeA.y + shapeA.height / 2 - (shapeB.y + shapeB.height / 2),
  //     // add the half widths and half heights of the objects
  //     hWidths = shapeA.width / 2 + shapeB.width / 2,
  //     hHeights = shapeA.height / 2 + shapeB.height / 2;

  //   // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
  //   if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
  //     // figures out on which side we are colliding (top, bottom, left, or right)
  //     const oX = hWidths - Math.abs(vX),
  //       oY = hHeights - Math.abs(vY);
  //     if (oX >= oY) {
  //       if (vY >= 0) {
  //         return "t";
  //       } else {
  //         return "b";
  //       }
  //     } else {
  //       if (vX >= 0) {
  //         return "l";
  //       } else {
  //         return "r";
  //       }
  //     }
  //   } else {
  //     return null;
  //   }
  // }
}

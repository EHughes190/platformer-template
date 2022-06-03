import { Idle, Running, Jumping, Falling } from "./playerStates.js";

export class Player {
  constructor(game) {
    this.game = game;
    this.height = 25;
    this.width = 25;
    this.x = 100;
    this.y = 100;
    this.color = "white";
    this.vy = 0;
    this.gravity = 1;
    this.speed = 0;
    this.maxSpeed = 6;
    this.jumpHeight = 20;
    this.coyoteTime = 0.1;
    this.coyoteTimeCounter;

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

  update(input, deltaTime) {
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

    if (this.y + this.height < this.game.height) {
      this.vy += this.gravity;
    } else {
      this.vy = 0;
    }

    //coyote time
    if (this.isGrounded()) {
      this.coyoteTimeCounter = this.coyoteTime;
    } else {
      this.coyoteTimeCounter -= deltaTime / 1000;
    }

    //collision logic for platforms
    this.game.platforms.forEach((platform) => {
      if (
        this.y + this.height <= platform.y &&
        this.y + this.height + this.vy >= platform.y &&
        this.x + this.width >= platform.x &&
        this.x <= platform.x + platform.width
      ) {
        this.vy = 0;
        this.y = platform.y - this.height;
      }
    });

    this.currentState.handleInput(input);

    //Collision logic runs at the end of update
    //x bounds
    if (this.x <= 0) this.x = 0;
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;
    //y bounds
    if (this.y + this.height >= this.game.height) {
      this.y = this.game.height - this.height;
    }
  }

  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  //Can cause issues if not used in conjunction with states
  //If at peak of jump, vy = 0, so you could technically jump infinitely.
  //With states, the upwards force is only applied on enter of jump state, and not anywhere else. This keeps it contained.
  isGrounded() {
    if (this.vy === 0) {
      return true;
    } else {
      return false;
    }
  }

  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
    //nice place to log state changes and other values. Should be removed when game complete
    console.log(
      this.currentState,
      this.vy,
      this.onPlatform,
      this.isGrounded(),
      this.coyoteTimeCounter
    );
  }

  //Below a function which I have not used here for collisions, but could be of some use for more fleshed out games so I have left it here.
  /**
   *
   * @param {Player} shapeA
   * @param {Platform} shapeB
   * @returns a string determining the colliding direction relative to shapeA
   */
  colCheck(shapeA, shapeB) {
    // get the vectors to check against
    let vX = shapeA.x + shapeA.width / 2 - (shapeB.x + shapeB.width / 2),
      vY = shapeA.y + shapeA.height / 2 - (shapeB.y + shapeB.height / 2),
      // add the half widths and half heights of the objects
      hWidths = shapeA.width / 2 + shapeB.width / 2,
      hHeights = shapeA.height / 2 + shapeB.height / 2;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
      // figures out on which side we are colliding (top, bottom, left, or right)
      const oX = hWidths - Math.abs(vX),
        oY = hHeights - Math.abs(vY);
      if (oX >= oY) {
        if (vY >= 0) {
          return "t";
        } else {
          return "b";
        }
      } else {
        if (vX >= 0) {
          return "l";
        } else {
          return "r";
        }
      }
    } else {
      return null;
    }
  }
}

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
    this.currentState.handleInput(input);
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

    if (!this.isGrounded()) {
      this.vy += this.gravity;
    } else {
      this.vy = 0;
    }

    this.checkCollisions();
  }

  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  isGrounded() {
    return this.y >= this.game.height - this.height;
  }

  checkCollisions() {
    //x bounds
    if (this.x <= 0) this.x = 0;
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;
    //y bounds
    if (this.y >= this.game.height - this.height) {
      this.y = this.game.height - this.height;
    }
  }

  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }
}

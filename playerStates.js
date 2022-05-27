//State file handles player state. Easy to extend by adding another state of choice, and changing transitions in the handleInput method. 'state' enum corresponds to the player states array indices

const states = {
  IDLE: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  HIT: 4,
};

class State {
  constructor(state) {
    this.state = state;
  }
}

export class Idle extends State {
  constructor(player) {
    super("IDLE");
    this.player = player;
  }
  enter() {}

  handleInput(input) {
    if ((input.left || input.right) && this.player.isGrounded()) {
      this.player.setState(states.RUNNING);
    } else if (input.up) {
      this.player.setState(states.JUMPING);
    } else if (!this.player.isGrounded()) {
      this.player.setState(states.FALLING);
    }
  }
}

export class Running extends State {
  constructor(player) {
    super("RUNNING");
    this.player = player;
  }
  enter() {}

  handleInput(input) {
    if (this.player.speed === 0 && this.player.isGrounded()) {
      this.player.setState(states.IDLE);
    } else if (input.up) {
      this.player.setState(states.JUMPING);
    } else if (
      !this.player.isGrounded() &&
      this.player.coyoteTimeCounter <= 0
    ) {
      this.player.setState(states.FALLING);
    }
  }
}

export class Jumping extends State {
  constructor(player) {
    super("JUMPING");
    this.player = player;
  }
  enter() {
    this.player.vy -= this.player.jumpHeight;
  }

  handleInput(input) {
    //If we're at the peak of the jump
    if (this.player.vy >= 0 && !this.player.isGrounded()) {
      this.player.setState(states.FALLING);
    }
  }
}

export class Falling extends State {
  constructor(player) {
    super("FALLING");
    this.player = player;
  }
  enter() {}

  handleInput(input) {
    if (this.player.isGrounded()) {
      if (this.player.speed === 0) {
        this.player.setState(states.IDLE);
      } else {
        this.player.setState(states.RUNNING);
      }
    }
  }
}

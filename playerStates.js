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
    if (input.includes("a") || input.includes("d")) {
      this.player.setState(states.RUNNING);
    } else if (input.includes("w")) {
      this.player.setState(states.JUMPING);
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
    if (input.includes("d")) {
      this.player.speed = this.player.maxSpeed;
    } else if (input.includes("a")) {
      this.player.speed = -this.player.maxSpeed;
    } else {
      this.player.speed = 0;
    }

    if (this.player.speed === 0) {
      this.player.setState(states.IDLE);
    }

    if (input.includes("w")) {
      this.player.setState(states.JUMPING);
    }
  }
}

export class Jumping extends State {
  constructor(player) {
    super("JUMPING");
    this.player = player;
  }
  enter() {
    if (this.player.isGrounded()) {
      this.player.vy -= 20;
      this.player.x += this.player.speed;
    }
  }

  handleInput(input) {
    if (this.player.vy > this.player.weight) {
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

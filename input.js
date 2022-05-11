export class InputHandler {
  constructor(game) {
    this.game = game;
    // this.keys = {
    //   left: false,
    //   right: false,
    //   up: false,
    // };
    this.keys = [];

    // window.addEventListener("keydown", (e) => {
    //   if (e.key === "w") {
    //     this.keys.up = true;
    //   } else if (e.key ==="a") {
    //       this.keys.left = true
    //   } else if(e.key === "d") {
    //       this.keys.right = true;
    //   }
    // });

    window.addEventListener("keydown", (e) => {
      if (
        (e.key === "w" || e.key === "a" || e.key === "s" || e.key === "d") &&
        //not already in array
        this.keys.indexOf(e.key) === -1
      ) {
        this.keys.push(e.key);
      }
    });

    window.addEventListener("keyup", (e) => {
      if (e.key === "w" || e.key === "a" || e.key === "s" || e.key === "d") {
        this.keys.splice(e.key, 1);
      }

      console.log(this.keys);
    });
  }
}

//Registers player input and feeds to main game class.
export class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = {
            left: false,
            right: false,
            up: false,
        };
        window.addEventListener("keydown", (e) => {
            if (e.key === "w") {
                this.keys.up = true;
            }
            else if (e.key === "a") {
                this.keys.left = true;
            }
            else if (e.key === "d") {
                this.keys.right = true;
            }
        });
        window.addEventListener("keyup", (e) => {
            if (e.key === "w") {
                this.keys.up = false;
            }
            else if (e.key === "a") {
                this.keys.left = false;
            }
            else if (e.key === "d") {
                this.keys.right = false;
            }
        });
    }
}
//# sourceMappingURL=input.js.map
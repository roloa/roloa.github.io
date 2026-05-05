export class InputController {
  constructor({ movesDisplay, onDebugReload }) {
    this.movesDisplay = movesDisplay;
    this.onDebugReload = onDebugReload;
  }

  bindEvents() {
    if (!this.movesDisplay) {
      return;
    }

    this.movesDisplay.addEventListener("click", () => {
      if (typeof this.onDebugReload === "function") {
        this.onDebugReload();
      }
    });
  }
}

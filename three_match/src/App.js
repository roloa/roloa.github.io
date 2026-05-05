import { Game } from "./Game.js";
import { InputController } from "./InputController.js";

export class App {
  constructor() {
    this.boardGrid = document.getElementById("board-grid");
    this.pieceLayer = document.getElementById("piece-layer");
    this.movesDisplay = document.getElementById("moves-display");
    this.game = new Game({
      boardGrid: this.boardGrid,
      pieceLayer: this.pieceLayer,
    });
    this.inputController = new InputController({
      movesDisplay: this.movesDisplay,
      onDebugReload: () => this.game.debugReload(),
    });
  }

  start() {
    this.game.initialize();
    this.inputController.bindEvents();
  }
}

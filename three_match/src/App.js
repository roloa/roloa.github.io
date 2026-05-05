import { Game } from "./Game.js";

export class App {
  constructor() {
    this.boardGrid = document.getElementById("board-grid");
    this.pieceLayer = document.getElementById("piece-layer");
    this.game = new Game({
      boardGrid: this.boardGrid,
      pieceLayer: this.pieceLayer,
    });
  }

  start() {
    this.game.initialize();
  }
}

import { Board } from "./Board.js";
import { Renderer } from "./Renderer.js";

export class Game {
  constructor({ boardGrid, pieceLayer }) {
    this.board = new Board();
    this.renderer = new Renderer({ boardGrid, pieceLayer });
  }

  initialize() {
    this.renderer.renderBoard(this.board);
  }

  debugReload() {
    window.location.reload();
  }
}

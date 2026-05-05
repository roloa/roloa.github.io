export class Renderer {
  constructor({ boardGrid, pieceLayer }) {
    this.boardGrid = boardGrid;
    this.pieceLayer = pieceLayer;
  }

  renderBoard(board) {
    this.renderGrid(board);
    this.renderPieces(board);
  }

  renderGrid(board) {
    const cells = [];

    for (let i = 0; i < board.getCellCount(); i += 1) {
      cells.push('<div class="cell"></div>');
    }

    this.boardGrid.innerHTML = cells.join("");
  }

  renderPieces(board) {
    const pieces = board.getPieces().map(
      (piece) =>
        `<div class="piece piece-${piece.type}" data-row="${piece.row}" data-col="${piece.col}" style="transform: translate(calc(${piece.col} * (100% + var(--board-cell-gap))), calc(${piece.row} * (100% + var(--board-cell-gap))));"></div>`
    );

    this.pieceLayer.innerHTML = pieces.join("");
  }
}

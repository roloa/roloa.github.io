export class Board {
  constructor() {
    this.size = 7;
    this.pieceTypes = ["red", "yellow", "blue", "green", "purple"];
    this.layout = [
      ["red", "yellow", "blue", "green", "purple", "blue", "yellow"],
      ["green", "purple", "yellow", "red", "blue", "yellow", "purple"],
      ["blue", "green", "red", "purple", "yellow", "green", "red"],
      ["yellow", "blue", "green", "yellow", "red", "purple", "green"],
      ["purple", "red", "blue", "green", "purple", "red", "yellow"],
      ["green", "yellow", "purple", "blue", "green", "yellow", "blue"],
      ["red", "blue", "green", "red", "yellow", "purple", "green"],
    ];
  }

  getCellCount() {
    return this.size * this.size;
  }

  getPieces() {
    const pieces = [];

    this.layout.forEach((row, rowIndex) => {
      row.forEach((type, colIndex) => {
        if (!this.pieceTypes.includes(type)) {
          return;
        }

        pieces.push({
          row: rowIndex,
          col: colIndex,
          type,
        });
      });
    });

    return pieces;
  }
}

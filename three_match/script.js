const BOARD_SIZE = 9;
const PIECE_TYPES = ["red", "yellow", "blue", "green", "purple"];

const layout = [
  ["red", "yellow", "blue", "green", "purple", "blue", "yellow", "green", "red"],
  ["green", "purple", "yellow", "red", "blue", "yellow", "purple", "red", "green"],
  ["blue", "green", "red", "purple", "yellow", "green", "red", "blue", "yellow"],
  ["yellow", "blue", "green", "yellow", "red", "purple", "green", "yellow", "blue"],
  ["purple", "red", "blue", "green", "purple", "red", "yellow", "green", "purple"],
  ["green", "yellow", "purple", "blue", "green", "yellow", "blue", "red", "green"],
  ["red", "blue", "green", "red", "yellow", "purple", "green", "blue", "yellow"],
  ["yellow", "green", "red", "purple", "blue", "green", "red", "yellow", "purple"],
  ["blue", "purple", "yellow", "green", "red", "blue", "purple", "green", "red"],
];

const boardGrid = document.getElementById("board-grid");
const pieceLayer = document.getElementById("piece-layer");

function renderBoardGrid() {
  const cells = [];

  for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i += 1) {
    cells.push('<div class="cell"></div>');
  }

  boardGrid.innerHTML = cells.join("");
}

function renderPieces() {
  const pieces = [];

  layout.forEach((row, rowIndex) => {
    row.forEach((type, colIndex) => {
      if (!PIECE_TYPES.includes(type)) return;

      pieces.push(
        `<div class="piece piece-${type}" data-row="${rowIndex}" data-col="${colIndex}" style="transform: translate(calc(${colIndex} * (100% + var(--board-cell-gap))), calc(${rowIndex} * (100% + var(--board-cell-gap))));"></div>`
      );
    });
  });

  pieceLayer.innerHTML = pieces.join("");
}

renderBoardGrid();
renderPieces();

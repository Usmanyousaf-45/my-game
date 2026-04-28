export type Board = number[][];

export function isSafe(board: Board, row: number, col: number, num: number) {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) return false;
    if (board[x][col] === num) return false;
  }

  const startRow = row - (row % 3);
  const startCol = col - (col % 3);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num) return false;
    }
  }

  return true;
}

// 🔥 SOLVER (AI BACKTRACKING)
export function solveSudoku(board: Board): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isSafe(board, row, col, num)) {
            board[row][col] = num;

            if (solveSudoku(board)) return true;

            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

// 🎲 SIMPLE GENERATOR (BASE PUZZLE)
export function generateSudoku(): Board {
  const board: Board = Array(9)
    .fill(0)
    .map(() => Array(9).fill(0));

  solveSudoku(board);

  // remove cells for puzzle
  let attempts = 40;

  while (attempts > 0) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);

    if (board[row][col] !== 0) {
      board[row][col] = 0;
      attempts--;
    }
  }

  return board;
}

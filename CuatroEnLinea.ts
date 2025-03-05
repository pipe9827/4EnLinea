class CuatroEnLinea {
  rows: number;
  cols: number;
  board: number[][];
  currentPlayer: number;

  constructor(rows = 6, cols = 7) {
      this.rows = rows;
      this.cols = cols;
      this.board = [];

      // Crear la matriz manualmente en lugar de usar Array.from()
      for (let i = 0; i < this.rows; i++) {
          this.board[i] = [];
          for (let j = 0; j < this.cols; j++) {
              this.board[i][j] = 0;
          }
      }

      this.currentPlayer = 1;
      this.initBoard();
  }

  initBoard() {
      const boardElement = document.getElementById("board")!;
      boardElement.innerHTML = "";
      boardElement.style.display = "grid";
      boardElement.style.gridTemplateColumns = `repeat(${this.cols}, 60px)`; // Asegurar que el tablero tenga el formato correcto
      boardElement.style.gridGap = "5px";

      for (let row = 0; row < this.rows; row++) {
          for (let col = 0; col < this.cols; col++) {
              const cell = document.createElement("div");
              cell.classList.add("cell");
              cell.dataset.row = row.toString();
              cell.dataset.column = col.toString();
              cell.addEventListener("click", () => this.placeToken(col));
              boardElement.appendChild(cell);
          }
      }
  }

  placeToken(col: number) {
      for (let row = this.rows - 1; row >= 0; row--) {
          if (this.board[row][col] === 0) {
              this.board[row][col] = this.currentPlayer;
              this.updateBoard();
              if (this.checkWinner(row, col)) {
                  alert(`¡Jugador ${this.currentPlayer} ha ganado!`);
                  return;
              }
              this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
              document.getElementById("turn-indicator")!.textContent = `Turno del jugador ${this.currentPlayer}`;
              return;
          }
      }
  }

  updateBoard() {
      const cells = document.querySelectorAll(".cell");
      cells.forEach((cell) => {
          const row = parseInt((cell as HTMLElement).dataset.row!);
          const col = parseInt((cell as HTMLElement).dataset.column!);
          const player1Color = (document.getElementById("player1-color") as HTMLInputElement).value;
          const player2Color = (document.getElementById("player2-color") as HTMLInputElement).value;
          const color = this.board[row][col] === 1 ? player1Color : 
                        this.board[row][col] === 2 ? player2Color : "white";
          (cell as HTMLElement).style.backgroundColor = color;
      });
  }

  checkWinner(row: number, col: number): boolean {
      return this.checkDirection(row, col, 1, 0) || // Vertical
             this.checkDirection(row, col, 0, 1) || // Horizontal
             this.checkDirection(row, col, 1, 1) || // Diagonal /
             this.checkDirection(row, col, 1, -1);  // Diagonal \
  }

  checkDirection(row: number, col: number, rowDir: number, colDir: number): boolean {
      let count = 1;
      count += this.countInDirection(row, col, rowDir, colDir);
      count += this.countInDirection(row, col, -rowDir, -colDir);
      return count >= 4;
  }

  countInDirection(row: number, col: number, rowDir: number, colDir: number): number {
      let count = 0;
      let r = row + rowDir, c = col + colDir;
      while (r >= 0 && r < this.rows && c >= 0 && c < this.cols && this.board[r][c] === this.currentPlayer) {
          count++;
          r += rowDir;
          c += colDir;
      }
      return count;
  }
}

document.getElementById("reset")!.addEventListener("click", () => new CuatroEnLinea());
window.onload = () => new CuatroEnLinea();

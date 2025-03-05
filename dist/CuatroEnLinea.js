"use strict";
class CuatroEnLinea {
    constructor(rows = 6, cols = 7) {
        this.rows = rows;
        this.cols = cols;
        this.board = Array.from({ length: rows }, () => Array(cols).fill(0));
        this.currentPlayer = 1;
        this.initBoard();
    }
    initBoard() {
        const boardElement = document.getElementById("board");
        boardElement.innerHTML = "";
        boardElement.classList.add("board");
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
    placeToken(col) {
        for (let row = this.rows - 1; row >= 0; row--) {
            if (this.board[row][col] === 0) {
                this.board[row][col] = this.currentPlayer;
                this.animateToken(row, col);
                if (this.checkWinner(row, col)) {
                    setTimeout(() => {
                        alert(`¡Jugador ${this.currentPlayer} ha ganado!`);
                        this.highlightWinningTokens();
                    }, 500);
                    return;
                }
                this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
                document.getElementById("turn-indicator").textContent = `Turno del jugador ${this.currentPlayer}`;
                return;
            }
        }
    }
    animateToken(row, col) {
        const player1Color = document.getElementById("player1-color").value;
        const player2Color = document.getElementById("player2-color").value;
        const color = this.currentPlayer === 1 ? player1Color : player2Color;
        let tempRow = 0;
        const interval = setInterval(() => {
            if (tempRow > 0) {
                const prevCell = document.querySelector(`.cell[data-row='${tempRow - 1}'][data-column='${col}']`);
                prevCell.style.backgroundColor = "white";
            }
            const currentCell = document.querySelector(`.cell[data-row='${tempRow}'][data-column='${col}']`);
            currentCell.style.backgroundColor = color;
            currentCell.classList.add("falling");
            if (tempRow === row) {
                clearInterval(interval);
                currentCell.classList.remove("falling");
                currentCell.classList.add("bounce");
            }
            else {
                tempRow++;
            }
        }, 50);
    }
    checkWinner(row, col) {
        return this.checkDirection(row, col, 1, 0) || // Vertical
            this.checkDirection(row, col, 0, 1) || // Horizontal
            this.checkDirection(row, col, 1, 1) || // Diagonal /
            this.checkDirection(row, col, 1, -1); // Diagonal \
    }
    highlightWinningTokens() {
        document.querySelectorAll(".cell").forEach(cell => {
            if (getComputedStyle(cell).backgroundColor !== "rgb(255, 255, 255)") {
                cell.classList.add("winning-cell");
            }
        });
    }
    checkDirection(row, col, rowDir, colDir) {
        let count = 1;
        count += this.countInDirection(row, col, rowDir, colDir);
        count += this.countInDirection(row, col, -rowDir, -colDir);
        return count >= 4;
    }
    countInDirection(row, col, rowDir, colDir) {
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
document.getElementById("reset").addEventListener("click", () => new CuatroEnLinea());
window.onload = () => new CuatroEnLinea();

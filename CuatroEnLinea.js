var CuatroEnLinea = /** @class */ (function () {
    function CuatroEnLinea(rows, cols) {
        if (rows === void 0) { rows = 6; }
        if (cols === void 0) { cols = 7; }
        this.rows = rows;
        this.cols = cols;
        this.board = Array.from({ length: rows }, function () { return Array(cols).fill(0); });
        this.currentPlayer = 1;
        this.initBoard();
    }
    CuatroEnLinea.prototype.initBoard = function () {
        var _this = this;
        var boardElement = document.getElementById("board");
        boardElement.innerHTML = "";
        boardElement.classList.add("board");
        for (var row = 0; row < this.rows; row++) {
            var _loop_1 = function (col) {
                var cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = row.toString();
                cell.dataset.column = col.toString();
                cell.addEventListener("click", function () { return _this.placeToken(col); });
                boardElement.appendChild(cell);
            };
            for (var col = 0; col < this.cols; col++) {
                _loop_1(col);
            }
        }
    };
    CuatroEnLinea.prototype.placeToken = function (col) {
        var _this = this;
        for (var row = this.rows - 1; row >= 0; row--) {
            if (this.board[row][col] === 0) {
                this.board[row][col] = this.currentPlayer;
                this.animateToken(row, col);
                if (this.checkWinner(row, col)) {
                    setTimeout(function () {
                        alert("\u00A1Jugador ".concat(_this.currentPlayer, " ha ganado!"));
                        _this.highlightWinningTokens();
                    }, 500);
                    return;
                }
                this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
                document.getElementById("turn-indicator").textContent = "Turno del jugador ".concat(this.currentPlayer);
                return;
            }
        }
    };
    CuatroEnLinea.prototype.animateToken = function (row, col) {
        var player1Color = document.getElementById("player1-color").value;
        var player2Color = document.getElementById("player2-color").value;
        var color = this.currentPlayer === 1 ? player1Color : player2Color;
        var tempRow = 0;
        var interval = setInterval(function () {
            if (tempRow > 0) {
                var prevCell = document.querySelector(".cell[data-row='".concat(tempRow - 1, "'][data-column='").concat(col, "']"));
                prevCell.style.backgroundColor = "white";
            }
            var currentCell = document.querySelector(".cell[data-row='".concat(tempRow, "'][data-column='").concat(col, "']"));
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
    };
    CuatroEnLinea.prototype.checkWinner = function (row, col) {
        return this.checkDirection(row, col, 1, 0) || // Vertical
            this.checkDirection(row, col, 0, 1) || // Horizontal
            this.checkDirection(row, col, 1, 1) || // Diagonal /
            this.checkDirection(row, col, 1, -1); // Diagonal \
    };
    CuatroEnLinea.prototype.highlightWinningTokens = function () {
        document.querySelectorAll(".cell").forEach(function (cell) {
            if (getComputedStyle(cell).backgroundColor !== "rgb(255, 255, 255)") {
                cell.classList.add("winning-cell");
            }
        });
    };
    CuatroEnLinea.prototype.checkDirection = function (row, col, rowDir, colDir) {
        var count = 1;
        count += this.countInDirection(row, col, rowDir, colDir);
        count += this.countInDirection(row, col, -rowDir, -colDir);
        return count >= 4;
    };
    CuatroEnLinea.prototype.countInDirection = function (row, col, rowDir, colDir) {
        var count = 0;
        var r = row + rowDir, c = col + colDir;
        while (r >= 0 && r < this.rows && c >= 0 && c < this.cols && this.board[r][c] === this.currentPlayer) {
            count++;
            r += rowDir;
            c += colDir;
        }
        return count;
    };
    return CuatroEnLinea;
}());
document.getElementById("reset").addEventListener("click", function () { return new CuatroEnLinea(); });
window.onload = function () { return new CuatroEnLinea(); };

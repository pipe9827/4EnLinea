var CuatroEnLinea = /** @class */ (function () {
    function CuatroEnLinea(rows, cols) {
        if (rows === void 0) { rows = 6; }
        if (cols === void 0) { cols = 7; }
        this.rows = rows;
        this.cols = cols;
        this.board = [];
        // Crear la matriz manualmente en lugar de usar Array.from()
        for (var i = 0; i < this.rows; i++) {
            this.board[i] = [];
            for (var j = 0; j < this.cols; j++) {
                this.board[i][j] = 0;
            }
        }
        this.currentPlayer = 1;
        this.initBoard();
    }
    CuatroEnLinea.prototype.initBoard = function () {
        var _this = this;
        var boardElement = document.getElementById("board");
        boardElement.innerHTML = "";
        boardElement.style.display = "grid";
        boardElement.style.gridTemplateColumns = "repeat(".concat(this.cols, ", 60px)"); // Asegurar que el tablero tenga el formato correcto
        boardElement.style.gridGap = "5px";
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
        for (var row = this.rows - 1; row >= 0; row--) {
            if (this.board[row][col] === 0) {
                this.board[row][col] = this.currentPlayer;
                this.updateBoard();
                if (this.checkWinner(row, col)) {
                    alert("\u00A1Jugador ".concat(this.currentPlayer, " ha ganado!"));
                    return;
                }
                this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
                document.getElementById("turn-indicator").textContent = "Turno del jugador ".concat(this.currentPlayer);
                return;
            }
        }
    };
    CuatroEnLinea.prototype.updateBoard = function () {
        var _this = this;
        var cells = document.querySelectorAll(".cell");
        cells.forEach(function (cell) {
            var row = parseInt(cell.dataset.row);
            var col = parseInt(cell.dataset.column);
            var player1Color = document.getElementById("player1-color").value;
            var player2Color = document.getElementById("player2-color").value;
            var color = _this.board[row][col] === 1 ? player1Color :
                _this.board[row][col] === 2 ? player2Color : "white";
            cell.style.backgroundColor = color;
        });
    };
    CuatroEnLinea.prototype.checkWinner = function (row, col) {
        return this.checkDirection(row, col, 1, 0) || // Vertical
            this.checkDirection(row, col, 0, 1) || // Horizontal
            this.checkDirection(row, col, 1, 1) || // Diagonal /
            this.checkDirection(row, col, 1, -1); // Diagonal \
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

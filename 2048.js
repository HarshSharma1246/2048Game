var board;
var score = 0;
var highest = 0;
var rows = 4;
var columns = 4;
window.onload = function () {
    setGame();
}
function setGame() {
    document.getElementById("board").innerHTML = "";
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = `${r}-${c}`;
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    setNew();
    setNew();
}
function hasEmptyTile() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (board[i][j] == 0) return true;
        }
    }
    return false;
}
function setNew() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            board[r][c] = (Math.floor(Math.random() * 2 + 1)) * 2;
            let tile = document.getElementById(`${r}-${c}`);
            if (board[r][c] == 2) {
                tile.innerText = "2";
                tile.classList.add("x2");
            } else if (board[r][c] == 4) {
                tile.innerText = "4";
                tile.classList.add("x4");
            }
            found = true;
        }
    }
}
function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if (num !== 0) {
        tile.innerText = num;
        if (num <= 4096) {
            tile.classList.add(`x${num}`);
        } else {
            tile.classList.add("x8196");
        }
    }
}

let validMove = false;

document.addEventListener("keydown", (e) => {
    validMove = false;
    if (e.code == "ArrowLeft") {
        slideLeft();
    } else if (e.code == "ArrowRight") {
        slideRight();
    } else if (e.code == "ArrowUp") {
        slideUp();
    } else if (e.code == "ArrowDown") {
        slideDown();
    }
    if (validMove) {
        setNew();
    }
    document.getElementById("score").innerText = score;
    if (score > highest) {
        document.getElementById("highest").innerText = score;
        highest = score;
    }
    if (gameOver() == true) {
        alert(`Game over!!!! Your score is ${score}`);
        score = 0
        document.getElementById("score").innerText = score;
        setGame()
    }
})
function gameOver() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 1; c++) {
            if (board[r][c] == 0 || board[r][c + 1] == 0) return false;
            if (board[r][c] == board[r][c + 1]) return false;
        }
    }
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 1; r++) {
            if (board[r][c] == board[r + 1][c]) return false;
        }
    }
    return true;
}

function filterZero(row) {
    return row.filter(num => num != 0);
}

function slide(row) {
    row = filterZero(row);
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    }
    row = filterZero(row);
    while (row.length < columns) {
        row.push(0);
    }
    return row;
}

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        for (let i = 0; i < columns; i++) {
            if (board[r][i] != row[i]) {
                validMove = true;
            }
            board[r][i] = row[i];
            let tile = document.getElementById(`${r}-${i}`);
            let num = board[r][i];
            updateTile(tile, num);
        }
    }
}
function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r].slice();
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let i = 0; i < columns; i++) {
            if (board[r][i] != row[i]) {
                validMove = true;
            }
            board[r][i] = row[i];
            let tile = document.getElementById(`${r}-${i}`);
            let num = board[r][i];
            updateTile(tile, num);
        }
    }
}
function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        for (let r = 0; r < rows; r++) {
            if (board[r][c] != row[r]) {
                validMove = true;
            }
            board[r][c] = row[r];
            let tile = document.getElementById(`${r}-${c}`);
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}
function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();

        for (let r = 0; r < rows; r++) {
            if (board[r][c] != row[r]) {
                validMove = true;
            }
            board[r][c] = row[r];
            let tile = document.getElementById(`${r}-${c}`);
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}
let button = document.getElementById("Reset")
button.addEventListener("click", () => {
    score = 0;
    document.getElementById("score").innerText = score;
    setGame();
})

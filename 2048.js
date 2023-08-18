var board;
var score = 0;
var rows = 4;
var columns = 4;
window.onload = function () {
    setGame();
}
function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
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
            let tile = document.getElementById(r.toString() + '-' + c.toString());
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
    if (num > 0) {
        tile.innerText = num;
        if (num <= 4096) {
            tile.classList.add("x" + num.toString());
        } else {
            tile.classList.add("x8196");
        }
    }
}
function gameOver() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 1; c++) {
            if (board[r][c] === board[r][c + 1]) {
                return true;
            }
        }
    }
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 1; r++) {
            if (board[r][c] === board[r + 1][c]) {
                return true;
            }
        }
    }
    return false;
}

let validMove = false;

document.addEventListener("keyup", (e) => {
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
})

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
        }
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}
function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r].slice();
        console.log("This is our board:" + board[r])
        console.log("Original row:" + row + " & " + board[r]); // Debug statement
        row.reverse();
        console.log("Reversed row:" + row + " & " + board[r]); // Debug statement
        row = slide(row);
        console.log("Slided row:", + row + " & " + board[r]); // Debug statement
        row.reverse();
        console.log("Final row:" + row + " & " + board[r]); // Debug statement
        for (let i = 0; i < columns; i++) {
            if (board[r][i] != row[i]) {
                validMove = true;
                console.log(validMove);
            }
            board[r][i] = row[i];
        }
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
        console.log("new row");
    }
    console.log("new time")
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
        }
        for (let r = 0; r < rows; r++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
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
        }
        for (let r = 0; r < rows; r++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}
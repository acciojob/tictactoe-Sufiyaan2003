//your JS code here. If required.
const form = document.getElementById('players-form');
const nameFormDiv = document.getElementById('name-form');
const gameArea = document.getElementById('game-area');
const boardDiv = document.querySelector('.board');
const messageDiv = document.querySelector('.message');

let players = [];
let currentPlayer = 0; // 0 or 1
let board = Array(9).fill("");
let isGameOver = false;

function createBoard() {
    boardDiv.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.id = (i + 1).toString();
        cell.className = 'cell';
        cell.addEventListener('click', () => handleCellClick(i));
        boardDiv.appendChild(cell);
    }
}

function handleCellClick(idx) {
    if (isGameOver || board[idx]) return;
    const symbol = currentPlayer === 0 ? 'X' : 'O';
    board[idx] = symbol;
    const cell = boardDiv.children[idx];
    cell.textContent = symbol;
    cell.style.fontFamily = "'Permanent Marker', cursive"; // mimic font style

    const winIdxs = checkWinner();
    if (winIdxs) {
        isGameOver = true;
        winIdxs.forEach(i => boardDiv.children[i].classList.add('win'));
        messageDiv.textContent = `${players[currentPlayer]}, congratulations you won!`;
        return;
    } else if (board.every(Boolean)) {
        isGameOver = true;
        messageDiv.textContent = `It's a draw!`;
        return;
    }
    // Switch turn
    currentPlayer = 1 - currentPlayer;
    messageDiv.textContent = `${players[currentPlayer]}, you're up`;
}

function checkWinner() {
    const wins = [
        [0,1,2],[3,4,5],[6,7,8], // rows
        [0,3,6],[1,4,7],[2,5,8], // cols
        [0,4,8],[2,4,6]          // diags
    ];
    for (let pattern of wins) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return pattern;
        }
    }
    return null;
}

form.addEventListener('submit', function(e){
    e.preventDefault();
    const p1 = document.getElementById('player-1').value.trim() || 'Player 1';
    const p2 = document.getElementById('player-2').value.trim() || 'Player 2';
    players = [p1, p2];
    currentPlayer = 0;
    board = Array(9).fill("");
    isGameOver = false;
    nameFormDiv.style.display = 'none';
    gameArea.style.display = '';
    messageDiv.textContent = `${players[currentPlayer]}, you're up`;
    createBoard();
});

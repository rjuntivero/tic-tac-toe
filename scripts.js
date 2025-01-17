const GameBoard = (function() {
    const winConditions = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6], 
        [1, 4, 7], 
        [2, 5, 8], 
        [0, 4, 8], 
        [2, 4, 6] 
    ];
    
    const board = document.querySelector(".board");
    const messagePanel = document.querySelector(".message");
    const resetBtn = document.querySelector(".resetGame")
    resetBtn.addEventListener("click", () => resetBoard())


    const boardState = Array(9).fill("");
    let currentPlayer = "X";
    let gameOver = false;

    const createBoard = () => {
        boardState.fill("");
        board.innerHTML = "";
        gameOver = false;
        messagePanel.textContent = `Player ${currentPlayer} turn`;
        for (let i = 0; i < 9; i++)
        {
            let boardTile = document.createElement("div")
            boardTile.classList.add("tile")
            boardTile.index = i;
            boardTile.addEventListener("click", () => checkClicked(i, boardTile));
            board.appendChild(boardTile);
        }
    }

    const resetBoard = () => {
        createBoard();
        document.querySelectorAll(".tile").forEach(tile => {
            tile.textContent = ""; 
        });
        currentPlayer = "X";
    }

    const checkClicked = (index, tile) => {
        if (gameOver || boardState[index] !== "") return;
        boardState[index] = currentPlayer;
        tile.innerHTML = `<h1>${currentPlayer}</h1>`;
        if (endGame(currentPlayer)) {
            messagePanel.textContent = `Player ${currentPlayer} wins!`;
            gameOver = true;
        } else if (boardState.every(cell => cell !== "")) {
            messagePanel.textContent = "It's a draw!";
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            messagePanel.textContent = `Player ${currentPlayer}'s turn`; 
        }
    }

    const endGame = (player) => {
        return winConditions.some(condition =>
            condition.every(index => boardState[index] === player)
        );
    }
    createBoard();
})();
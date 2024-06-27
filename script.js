const getInitialStateValues = {
  winner: null,
  currentPlayer: "X",
  board: () => Array(9).fill(null),
  messageElementText: `X Goes First`,
  winPatterns: () => [
    [0, 1, 2, "horizontalTop"],
    [3, 4, 5, "horizontalMiddle"],
    [6, 7, 8, "horizontalBottom"],
    [0, 3, 6, "verticalLeft"],
    [1, 4, 7, "verticalMiddle"],
    [2, 5, 8, "verticalRight"],
    [0, 4, 8, "leftDiagonal"],
    [2, 4, 6, "rightDiagonal"],
  ],
};

class TicTacToe {
  constructor({ board, winner, winPatterns, currentPlayer }) {
    this.board = board();
    this.winner = winner;
    this.winPatterns = winPatterns();
    this.currentPlayer = currentPlayer;

    this.gridBoard = document.querySelector(".grid");
    this.lineElement = document.querySelector(".line");
    this.resetGameBtnEl = document.querySelector(".resetGameBtn");
    this.messageElement = document.querySelector(".messageElement");

    this.init();
  }

  init() {
    this.messageElement.innerText = getInitialStateValues.messageElementText;
    this.resetGameBtnEl.addEventListener("click", this.resetGame.bind(this));

    document.querySelectorAll(".cell").forEach((cell) => {
      cell.addEventListener("click", this.handleClick.bind(this));
    });
  }

  checkWinner() {
    for (const pattern of this.winPatterns) {
      const [a, b, c, lineClass] = pattern;

      if (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      )
        return this.endGame(`${this.currentPlayer} Won`, lineClass);
    }

    if (!this.board.includes(null)) return this.endGame("Draw");
  }

  handleClick(event) {
    const id = Number(event.target.id);
    if (this.board[id] || this.winner) return;

    this.board[id] = this.currentPlayer;
    event.target.innerText = this.currentPlayer;
    event.target.classList.add("disable");
    this.resetGameBtnEl.classList.remove("hidden");
    if (this.checkWinner()) return;
    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    this.messageElement.innerText = `${this.currentPlayer} Turn`;
  }

  endGame(message, lineClass) {
    if (lineClass) {
      this.lineElement.classList.add(lineClass);
      this.lineElement.style.display = "block";
    }
    this.winner = this.currentPlayer;
    this.messageElement.innerText = message;
    this.gridBoard.classList.add("disable");

    return true;
  }

  resetGame() {
    const { board, winner, currentPlayer, messageElementText } =
      getInitialStateValues;

    this.board = board();
    this.winner = winner;
    this.currentPlayer = currentPlayer;
    this.messageElement.innerText = messageElementText;

    this.lineElement.style.display = "none";
    this.gridBoard.classList.remove("disable");
    this.resetGameBtnEl.classList.add("hidden");
    this.lineElement.classList.forEach(
      (className) =>
        className !== "line" && this.lineElement.classList.remove(className)
    );
    document.querySelectorAll(".cell").forEach((cell) => {
      cell.innerText = null;
      cell.classList.remove("disable");
    });
  }
}

document.addEventListener(
  "DOMContentLoaded",
  () => new TicTacToe(getInitialStateValues)
);

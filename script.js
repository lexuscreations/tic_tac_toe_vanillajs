// Initial state configuration for the Tic Tac Toe game
const initialState = {
  winner: null,
  currentPlayer: "X",
  board: () => Array(9).fill(null),
  messageElementText: `X Goes First`,
  winPatterns: [
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

// TicTacToe class to encapsulate game logic and state
class TicTacToe {
  constructor({
    board,
    winner,
    winPatterns,
    currentPlayer,
    messageElementText,
  }) {
    this.board = board(); // Initialize board with empty cells
    this.winner = winner; // Initialize winner as null
    this.winPatterns = winPatterns; // Initialize winning patterns
    this.currentPlayer = currentPlayer; // Set the starting player
    this.messageElementText = messageElementText; // Set the initial message

    // Cache DOM elements for later use
    this.cacheDOMElements();
    // Bind event listeners
    this.bindEvents();
    // Initialize the game
    this.init();
  }

  // Cache DOM elements to avoid querying the DOM multiple times
  cacheDOMElements() {
    this.gridBoard = document.querySelector(".grid");
    this.lineElement = document.querySelector(".line");
    this.resetGameBtn = document.querySelector(".resetGameBtn");
    this.messageElement = document.querySelector(".messageElement");
  }

  // Bind event listeners to DOM elements
  bindEvents() {
    this.resetGameBtn.addEventListener("click", this.resetGame.bind(this));
    document
      .querySelectorAll(".cell")
      .forEach((cell) =>
        cell.addEventListener("click", this.handleClick.bind(this))
      );
  }

  // Initialize the game state and update the message element
  init() {
    this.messageElement.innerText = this.messageElementText;
  }

  // Check if there's a winner or if the game is a draw
  checkWinner() {
    for (const [a, b, c, lineClass] of this.winPatterns) {
      // Check if a winning pattern is met
      if (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        return this.endGame(`${this.currentPlayer} Won`, lineClass);
      }
    }

    // Check for draw
    if (!this.board.includes(null)) {
      return this.endGame("Draw");
    }
  }

  // Handle click events on the game cells
  handleClick(event) {
    const id = +event.target.id; // Get the clicked cell id
    if (this.board[id] || this.winner) return; // Ignore if cell is already filled or if there's a winner

    // Update board state and UI
    this.board[id] = this.currentPlayer;
    event.target.innerText = this.currentPlayer;
    event.target.classList.add("disable");
    this.resetGameBtn.classList.remove("hidden");

    // Check for winner or change turn
    if (this.checkWinner()) return;
    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    this.messageElement.innerText = `${this.currentPlayer} Turn`;
  }

  // End the game and display the result
  endGame(message, lineClass) {
    if (lineClass) {
      this.lineElement.classList.add(lineClass);
      this.lineElement.style.display = "block";
    }

    this.winner = this.currentPlayer; // Set the winner
    this.messageElement.innerText = message;
    this.gridBoard.classList.add("disable");
    return true;
  }

  // Reset the game to its initial state
  resetGame() {
    // Reset state using initial state values
    Object.assign(this, initialState, { board: initialState.board() });

    // Reset UI elements
    this.messageElement.innerText = this.messageElementText;
    this.lineElement.style.display = "none";
    this.gridBoard.classList.remove("disable");
    this.resetGameBtn.classList.add("hidden");

    // Reset line element classes
    this.lineElement.className = "line";
    document.querySelectorAll(".cell").forEach((cell) => {
      cell.innerText = "";
      cell.classList.remove("disable");
    });
  }
}

// Initialize the game once the DOM content is fully loaded
document.addEventListener(
  "DOMContentLoaded",
  () => new TicTacToe(initialState)
);

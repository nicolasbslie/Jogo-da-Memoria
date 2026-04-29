const board = document.getElementById("board");
const scoreEl = document.getElementById("score");
const movesEl = document.getElementById("moves");
const resetBtn = document.getElementById("reset");

let icons = ["🍎","🍌","🍇","🍓","🍍","🥝"];
let cardsArray = [...icons, ...icons];

let primeiraCarta = null;
let segundadCarta = null;
let lockBoard = false;

let score = 0;
let moves = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  board.innerHTML = "";
  cardsArray = shuffle(cardsArray);

  cardsArray.forEach(icon => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.icon = icon;

    card.textContent = "?";

    card.addEventListener("click", handleClick);

    board.appendChild(card);
  });
}

function handleClick() {
  if (lockBoard) return;
  if (this === primeiraCarta) return;
  if (this.classList.contains("correct")) return;

  this.textContent = this.dataset.icon;

  if (!primeiraCarta) {
    primeiraCarta = this;
    return;
  }

  segundadCarta = this;
  lockBoard = true;

  moves++;
  movesEl.textContent = moves;

  checkMatch();
}

function checkMatch() {
  let isMatch = primeiraCarta.dataset.icon === segundadCarta.dataset.icon;

  if (isMatch) {
    primeiraCarta.classList.add("correct");
    segundadCarta.classList.add("correct");

    score++;
    scoreEl.textContent = score;

    resetTurn();
  } else {
    setTimeout(() => {
      primeiraCarta.textContent = "?";
      segundadCarta.textContent = "?";

      scoreEl.textContent = score;

      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  primeiraCarta = null;
  segundadCarta = null;
  lockBoard = false;
}

// botão reset
resetBtn.addEventListener("click", () => {
  score = 0;
  moves = 0;
  scoreEl.textContent = score;
  movesEl.textContent = moves;
  createBoard();
});


createBoard();
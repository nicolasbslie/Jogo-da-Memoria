const board = document.getElementById("board");
const scoreEl = document.getElementById("score");
const movesEl = document.getElementById("moves");
const resetBtn = document.getElementById("reset");

// caminhos das imagens
let icons = [
  "https://upload.wikimedia.org/wikipedia/pt/0/02/Homer_Simpson_2006.png",
  "https://upload.wikimedia.org/wikipedia/pt/0/0b/Marge_Simpson.png",
  "https://upload.wikimedia.org/wikipedia/pt/a/aa/Bart_Simpson_200px.png",
  "https://upload.wikimedia.org/wikipedia/pt/6/67/Lisa_Simpson_personagem.png",
  "https://static.wikia.nocookie.net/omniversal-battlefield/images/2/27/MontgomeryBurns.png/revision/latest?cb=20190605233136",
  "https://upload.wikimedia.org/wikipedia/pt/9/9d/Maggie_Simpson.png",
];

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

    // carta virada pra baixo
    card.innerHTML = "?";

    card.addEventListener("click", handleClick);

    board.appendChild(card);
  });
}

function handleClick() {
  if (lockBoard) return;
  if (this === primeiraCarta) return;
  if (this.classList.contains("correct")) return;

  // mostra a imagem
  this.innerHTML = `<img src="${this.dataset.icon}" alt="">`;

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
      // esconde de novo
      primeiraCarta.innerHTML = "?";
      segundadCarta.innerHTML = "?";

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
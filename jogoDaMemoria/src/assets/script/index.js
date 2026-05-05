// ==========================
// PEGANDO ELEMENTOS DO HTML
// ==========================
const board = document.getElementById("board"); // área onde ficam as cartas
const scoreEl = document.getElementById("score"); // mostra a pontuação
const movesEl = document.getElementById("moves"); // mostra quantidade de jogadas
const resetBtn = document.getElementById("reset"); // botão de resetar o jogo


// ==========================
// LISTA DE IMAGENS (ICONS)
// ==========================
let icons = [
  "https://upload.wikimedia.org/wikipedia/pt/0/02/Homer_Simpson_2006.png",
  "https://upload.wikimedia.org/wikipedia/pt/0/0b/Marge_Simpson.png",
  "https://upload.wikimedia.org/wikipedia/pt/a/aa/Bart_Simpson_200px.png",
  "https://upload.wikimedia.org/wikipedia/pt/6/67/Lisa_Simpson_personagem.png",
  "https://static.wikia.nocookie.net/omniversal-battlefield/images/2/27/MontgomeryBurns.png/revision/latest?cb=20190605233136",
  "https://upload.wikimedia.org/wikipedia/pt/9/9d/Maggie_Simpson.png"
];

// DUPLICA AS IMAGENS PARA FORMAR OS PARES
let cardsArray = [...icons, ...icons];


// ==========================
// CONTROLE DO JOGO
// ==========================
let primeiraCarta = null; // guarda a primeira carta clicada
let segundadCarta = null; // guarda a segunda carta
let lockBoard = false; // trava o tabuleiro enquanto compara

let score = 0; // pontuação (pares encontrados)
let moves = 0; // número de jogadas


// ==========================
// FUNÇÃO: EMBARALHAR CARTAS
// ==========================
function shuffle(array) {
  // ordena o array de forma aleatória
  return array.sort(() => Math.random() - 0.5);
}


// ==========================
// FUNÇÃO: CRIAR TABULEIRO
// ==========================
function createBoard() {
  board.innerHTML = ""; // limpa o tabuleiro

  // embaralha as cartas
  cardsArray = shuffle(cardsArray);

  // percorre cada imagem
  cardsArray.forEach(icon => {

    // cria uma carta (div)
    const card = document.createElement("div");
    card.classList.add("card");

    // guarda o valor da imagem dentro da carta
    card.dataset.icon = icon;

    // carta começa virada (sem imagem)
    card.innerHTML = "";

    // adiciona evento de clique
    card.addEventListener("click", handleClick);

    // coloca a carta dentro do tabuleiro
    board.appendChild(card);
  });
}


// ==========================
// FUNÇÃO: CLIQUE NA CARTA
// ==========================
function handleClick() {

  // se o tabuleiro estiver travado, não faz nada
  if (lockBoard) return;

  // impede clicar duas vezes na mesma carta
  if (this === primeiraCarta) return;

  // impede clicar em carta já acertada
  if (this.classList.contains("correct")) return;

  // mostra a imagem da carta
  this.innerHTML = `<img src="${this.dataset.icon}" alt="">`;

  // se ainda não existe primeira carta
  if (!primeiraCarta) {
    primeiraCarta = this; // salva como primeira
    return;
  }

  // se já tem primeira, essa vira a segunda
  segundadCarta = this;
  lockBoard = true; // trava o jogo

  // aumenta jogadas
  moves++;
  movesEl.textContent = moves;

  // verifica se é par
  checkMatch();
}


// ==========================
// FUNÇÃO: VERIFICAR PAR
// ==========================
function checkMatch() {

  // compara as imagens das duas cartas
  let isMatch = primeiraCarta.dataset.icon === segundadCarta.dataset.icon;

  if (isMatch) {
    // se acertou, marca como correto
    primeiraCarta.classList.add("correct");
    segundadCarta.classList.add("correct");

    // aumenta pontuação
    score++;
    scoreEl.textContent = score;

    // reseta turno
    resetTurn();

  } else {
    // se errou, espera 1 segundo e vira de volta
    setTimeout(() => {
      primeiraCarta.innerHTML = "";
      segundadCarta.innerHTML = "";

      resetTurn();
    }, 1000);
  }
}


// ==========================
// FUNÇÃO: RESETAR TURNO
// ==========================
function resetTurn() {
  primeiraCarta = null;
  segundadCarta = null;
  lockBoard = false; // libera o jogo novamente
}


// ==========================
// BOTÃO RESET
// ==========================
resetBtn.addEventListener("click", () => {

  // zera pontuação e jogadas
  score = 0;
  moves = 0;

  // atualiza na tela
  scoreEl.textContent = score;
  movesEl.textContent = moves;

  // recria o tabuleiro
  createBoard();
});


// ==========================
// INICIAR O JOGO
// ==========================
createBoard();
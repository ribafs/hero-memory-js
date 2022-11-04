const grid = document.querySelector("[data-grid]");
let primeiroCard = "";
let segundoCard = "";
const jogador = document.querySelector("[data-jogador]");
const tempo = document.querySelector("[data-tempo]");
const modo = document.querySelector("[data-modo]");
const tentativas = document.querySelector("[data-tentativas]");
let vitoria = false;

const personargens = [
  "capita-marvel",
  "doutor-estranho",
  "feiticeira-escarlate",
  "gamora",
  "homem-aranha",
  "homem-de-ferro",
  "hulk",
  "jean-grey",
  "viuva-negra",
  "wolverine",
];

function criarElemento(tag, classe) {
  const elemento = document.createElement(tag);
  elemento.className = classe;
  return elemento;
}

function criarCard(personargem) {
  const card = criarElemento("div", "card");
  const front = criarElemento("div", "face front");
  const back = criarElemento("div", "face back");

  front.style.backgroundImage = `url(../images/marvel/${personargem}.png)`;
  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", revelarCard);
  card.setAttribute("data-personargem", personargem);
  return card;
}

function revelarCard({ target }) {
  if (target.parentNode.className.includes("revelarCard")) {
    return;
  }
  if (primeiroCard === "") {
    target.parentNode.classList.add("revelarCard");
    primeiroCard = target.parentNode;
  } else if (segundoCard === "") {
    target.parentNode.classList.add("revelarCard");
    segundoCard = target.parentNode;

    checarCards();
  }
}

function checarCards() {
  if (primeiroCard.dataset.personargem === segundoCard.dataset.personargem) {
    primeiroCard.firstChild.classList.add("desabilitarCard");
    segundoCard.firstChild.classList.add("desabilitarCard");
    primeiroCard = "";
    segundoCard = "";

    checarVitoria();
  } else {
    setTimeout(() => {
      primeiroCard.classList.remove("revelarCard");
      segundoCard.classList.remove("revelarCard");
      primeiroCard = "";
      segundoCard = "";
    }, 500);
  }
  tentativas.innerHTML -= 1;
  if (tentativas.innerHTML <= 0 && vitoria === false) {
    window.alert(
      `Infelizmente você perdeu, ${localStorage.getItem(
        "player"
      )}, seu tempo foi ${
        tempo.innerHTML
      } segundos e você usou todas as suas tentativas.`
    );
  }
}

function checarVitoria() {
  const cardsDesabilitados = document.querySelectorAll(".desabilitarCard");
  let numeroTentativas = 0;
  if (modo.innerHTML === "Fácil") {
    numeroTentativas = 20;
  } else if (modo.innerHTML === "Médio") {
    numeroTentativas = 16;
  } else if (modo.innerHTML === "Difícil") {
    numeroTentativas = 12;
  }
  if (cardsDesabilitados.length === 12) {
    vitoria = true;
    clearInterval(this.loop);
    window.alert(
      `Parabéns, você ganhou ${localStorage.getItem("player")}, seu tempo foi ${
        tempo.innerHTML
      } segundos, você usou ${
        numeroTentativas - +tentativas.innerHTML
      } de ${numeroTentativas} tentativas`
    );
  }
}

function carregarJogo() {
  const duplicarPersonargens = [...personargens, ...personargens];
  const embaralharArray = duplicarPersonargens.sort(() => Math.random() - 0.5);

  embaralharArray.forEach((personargem) => {
    const card = criarCard(personargem);
    grid.appendChild(card);
  });
}

function comecarTempo() {
  this.loop = setInterval(() => {
    const tempoAtual = +tempo.innerHTML;
    tempo.innerHTML = tempoAtual + 1;
  }, 1000);
}

window.onload = () => {
  jogador.innerHTML += localStorage.getItem("player");
  modo.innerHTML = localStorage.getItem("dificuldade");
  if (modo.innerHTML === "Fácil") {
    tentativas.innerHTML = 30;
  } else if (modo.innerHTML === "Médio") {
    tentativas.innerHTML = 25;
  } else if (modo.innerHTML === "Difícil") {
    tentativas.innerHTML = 20;
  }
  carregarJogo();
  comecarTempo();
};

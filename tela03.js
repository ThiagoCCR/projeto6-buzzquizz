let idQuizz3;
let objQuizz3;
let numQuestaoClicadas = 0;
let numQuestaoAcertadas = 0;

//chamada para identificar qual quizz foi selecionado
function renderizarTela03(element) {
  encontrarQuizz3();
}

//comparação feita pelo id da API
function encontrarQuizz3() {
  for (let i = 0; i < listaQuizz1.length; i++) {
    let quizzIterado = listaQuizz1[i];
    if (idQuizz3 === quizzIterado.id) {
      objQuizz3 = quizzIterado;
    }
  }

  pegarQuizzSelecionadoAPI3();
}

//chamando quizz na API
function pegarQuizzSelecionadoAPI3() {
  const promise = axios.get(`https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes/${idQuizz3}`);
  promise.catch(erroAoPegarQuizz3);
  promise.then(renderizarTela3);
}

function erroAoPegarQuizz3() {
  alert("Erro ao buscar o Quizz na API");
  window.location.reload();
}

//popular o DOM com o cabeçalho
function renderizarTela3(elemento) {
  objQuizz3 = elemento.data;
  const templateTela3 = `
    <div class="header">
        <h1>BuzzQuizz</h1>
    </div>
    <div class="main3">
        <div class="titulo3">
            <img src="${objQuizz3.image}"/>
            <div class="titulo-txt">
                <p> ${objQuizz3.title}</p>
            </div>
        </div>
    </div>`;

  const bodyDiv = document.querySelector("body");
  bodyDiv.innerHTML += templateTela3;

  renderizarQuestoes3();
}

//popular o DOM com as questões
function renderizarQuestoes3() {
  const bodyDiv = document.querySelector("body");
  const templateQuestoes = `
        <div class="questoes-container3"></div>`;
  bodyDiv.innerHTML += templateQuestoes;
  const caixaQuestaoDiv = document.querySelector(".questoes-container3");
  const numQuestoes = objQuizz3.questions.length;

  for (let i = 0; i < numQuestoes; i++) {
    const questao = objQuizz3.questions[i];
    const numRespostas = questao.answers.length;
    let templateRepostas = "";
    const questoesRandom = [...questao.answers].sort(randomizarQuestoes);

    for (let y = 0; y < numRespostas; y++) {
      templateRepostas += `
            <div onclick="selecionarAlternativa(${questoesRandom[y].isCorrectAnswer}, this)">
                <div class="resposta-img3">
                    <img src=${questoesRandom[y].image}>
                </div>
                <div class="resposta-texto3">
                    <p class="${questoesRandom[y].isCorrectAnswer}">${questoesRandom[y].text}</p>
                </div>
                <div class="box-opacity"></div>
            </div>`;
    }

    let templateQuestaoBox = `
                <div class="caixa-questao3">
                    <div class="titulo-pergunta-3" style="background-color:${objQuizz3.questions[i].color} !important">
                        <p>${objQuizz3.questions[i].title}</p>
                    </div>
                    <div class="respostas3">${templateRepostas}</div>
                </div>`;

    caixaQuestaoDiv.innerHTML += templateQuestaoBox;

    //adicionar cor pergunta
  }
}

//randomizar as questões mostradas
function randomizarQuestoes() {
  return Math.random() - 0.5;
}

//mostrar quais as alternativas corretas e incorretas
function selecionarAlternativa(booleano, element) {
  if (element.classList.contains("clicada")) {
    return;
  }

  element.classList.add("clicada");
  numQuestaoClicadas += 1;

  const alternativaCorreta = element.parentNode.querySelector("p.true");
  const alternativaIncorreta = element.parentNode.querySelectorAll("p.false");

  alternativaCorreta.classList.add("green");

  checarSeAcertou(booleano);

  for (let i = 0; i < alternativaIncorreta.length; i++) {
    alternativaIncorreta[i].classList.add("red");
  }

  let siblings = getSiblings(element);

  for (let i = 0; i < siblings.length; i++) {
    siblings[i].querySelector(".box-opacity").classList.add("opaco");
    siblings[i].classList.add("clicada");
  }

  const proximaQuestao = element.parentNode.parentNode.nextElementSibling;

  setTimeout(() => {
    if (proximaQuestao !== null) {
      proximaQuestao.scrollIntoView({ behavior: "auto", block: "center", inline: "center" });
    }
  }, 2000);

  calcularResultadoQuizz();
}

//olhar se acertou a função
function checarSeAcertou(booleano) {
  if (booleano === true) {
    numQuestaoAcertadas += 1;
  }
}

//selecionar todas as divs irmãs da alternativa selecionada
function getSiblings(elem) {
  var siblings = [];
  var sibling = elem.parentNode.firstChild;

  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== elem) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }

  return siblings;
}

//calcular resultado
function calcularResultadoQuizz() {
  let valorQuestão = 100 / objQuizz3.questions.length;
  let resultado = 0;

  if (numQuestaoClicadas === objQuizz3.questions.length) {
    resultado = Math.floor(valorQuestão * numQuestaoAcertadas);
    mostrarResultado(resultado);
  }
}

//renderiza tela de resultado no DOM
function mostrarResultado(resultado) {
  let nivel;

  for (let i = 0; i < objQuizz3.levels.length; i++) {
    if (resultado >= objQuizz3.levels[i].minValue) {
      nivel = objQuizz3.levels[i];
      console.log(nivel);
    }
  }

  const questaoContainerDiv = document.querySelector(".questoes-container3");
  const templateResultado = `
        <div class="caixa-questao3">
            <div class="titulo-pergunta-3">
                <p>${nivel.title}</p>
            </div>
            <div class="resultado">
                <div class="resultado-img">
                    <img src=${nivel.image}>
                </div>
                <div class="resultado-texto">
                    <p>${nivel.text}</p>
                </div>
            </div> 
        </div>
        <button class="reiniciar-quizz" onclick="reiniciarQuizz()">Reiniciar Quizz</button>
        <button class="voltar-home" onclick="voltarHome()">Voltar pra Home</button>`;

  questaoContainerDiv.innerHTML += templateResultado;

  setTimeout(() => {
    let divResultado = document.querySelector(".questoes-container3").lastElementChild;
    if (divResultado !== null) {
      divResultado.scrollIntoView({ behavior: "auto", block: "center", inline: "center" });
    }
  }, 2000);
}

function voltarHome() {
  window.location.reload();
}

function reiniciarQuizz() {
  const BodyDiv = document.querySelector("body");
  BodyDiv.innerHTML = "";
  numQuestaoClicadas = 0;
  numQuestaoAcertadas = 0;
  renderizarTela03();
}

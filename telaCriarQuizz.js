//para criar o quizz
function criarQuizz() {
  const BodyDiv = document.querySelector(".main1");
  BodyDiv.innerHTML = "";
  const criacaoQuizz = `
  <div class="criarQuizz criacaoTela1">
  <h1>Comece pelo começo</h1>
  <div class="esqueletoQuizz">
  <input type="text" placeholder="Título do seu quizz" />
  <input type="url" placeholder="URL da imagem do seu quizz" />
  <input type="number" placeholder="Quantidade de perguntas do quizz" min="3"/>
  <input type="number" placeholder="Quantidade de níveis do quizz" min="2"/>
  </div>
  <div class="prosseguir" onclick="validacaoBasica()">Prosseguir para criar perguntas</div>
  </div> 
    `;
  BodyDiv.innerHTML = criacaoQuizz;
}

//criando o objeto 
const meuQuizz = {};

//para validar as infos basicas do quizz
let titulo;
let urlImagem;
let qntPerguntas;
let qntNiveis;
function validacaoBasica() {
  titulo = document.querySelector(".esqueletoQuizz :nth-child(1)");
  urlImagem = document.querySelector(".esqueletoQuizz :nth-child(2)");
  qntPerguntas = document.querySelector(".esqueletoQuizz :nth-child(3)");
  qntNiveis = document.querySelector(".esqueletoQuizz :nth-child(4)");
  if (
    titulo.value.length < 20 ||
    titulo.value.length > 65 ||
    qntPerguntas.value < 3 ||
    qntNiveis.value < 2
  ) {
    alert("Preencha os dados corretamente");
    return;
  } 

  meuQuizz.title = titulo.value;
  meuQuizz.image = urlImagem.value;
  console.log(meuQuizz)
  criarPerguntas();
}

//para criar  as perguntas
function criarPerguntas() {
  qntPerguntas = document.querySelector(".esqueletoQuizz :nth-child(3)");
  const BodyDiv = document.querySelector(".main1");
  BodyDiv.innerHTML = `<div class="criarQuizz criacaoTela2">
  <h1>Crie suas perguntas</h1>`;

  for (let i = 1; i <= qntPerguntas.value; i++) {
    const lanesPerguntas = `
  <div class="perguntas num${i}">
  <div class="teste">
  <span>Pergunta ${i}</span>
  <ion-icon name="create-outline" onclick="editarPerguntas(this)"></ion-icon>
  </div>
  `;
    BodyDiv.querySelector(".criarQuizz").innerHTML += lanesPerguntas;
  }
  BodyDiv.querySelector(
    ".criarQuizz"
  ).innerHTML += `<div class="prosseguir" onclick="validacaoPerguntas()">Prosseguir para criar níveis</div>
  </div>`;
}

//para abrir as perguntas
function editarPerguntas(elemento) {
  elemento.classList.add("escondido");
  const classeAcima = elemento.parentNode.parentNode;
  classeAcima.innerHTML += `
  <div class="perguntasDetalhadas">
  <input type="text" placeholder="Título da pergunta" />
  <input type="text" placeholder="Cor de fundo da pergunta" />
 <div class="teste"><span>Resposta correta</span></div>
  <input type="text" placeholder="Resposta correta" />
  <input type="url" placeholder="URL da imagem" />
  <div class="teste"><span>Respostas incorretas</span></div> 
  <input type="text" placeholder="Resposta incorreta 1" />
  <input type="url" placeholder="URL da imagem 1" />
  <input type="text" placeholder="Resposta incorreta 2" />
  <input type="url" placeholder="URL da imagem 2" />
  <input type="text" placeholder="Resposta incorreta 3" />
  <input type="url" placeholder="URL da imagem 3" />
  </div>
  </div>
    `;
}

let tituloPergunta;
function validacaoPerguntas() {
criarObjetoPerguntas();
verificarPerguntas();
}

function criarObjetoPerguntas() {
  console.log(qntPerguntas.value);
  meuQuizz.questions = [];
  for (let i = 1; i <= qntPerguntas.value; i++) {
   tituloPergunta = document.querySelector(`.num${i} .perguntasDetalhadas :nth-child(1)`)
   corPergunta = document.querySelector(`.num${i} .perguntasDetalhadas :nth-child(2)`)
   respCorreta = document.querySelector(`.num${i} .perguntasDetalhadas :nth-child(4)`)
   imgRespCorreta = document.querySelector(`.num${i} .perguntasDetalhadas :nth-child(5)`)
   respIncorreta1 = document.querySelector(`.num${i} .perguntasDetalhadas :nth-child(7)`)
   respIncorreta2 = document.querySelector(`.num${i} .perguntasDetalhadas :nth-child(8)`)
   respIncorreta3 = document.querySelector(`.num${i} .perguntasDetalhadas :nth-child(9)`)
   imgRespIncorreta1 = document.querySelector(`.num${i} .perguntasDetalhadas :nth-child(10)`)
   imgRespIncorreta2 = document.querySelector(`.num${i} .perguntasDetalhadas :nth-child(11)`)
   imgRespIncorreta3 = document.querySelector(`.num${i} .perguntasDetalhadas :nth-child(12)`)
    meuQuizz.questions.push( 
    {
    title: tituloPergunta.value,
    color: corPergunta.value,
    answers: [
      {
        text: respCorreta.value,
        image: imgRespCorreta.value,
        isCorrectAnswer: true,
      },
      {
        text: respIncorreta1.value,
        image: imgRespIncorreta1.value,
        isCorrectAnswer: false,
      },
      {
        text: respIncorreta2.value,
        image: imgRespIncorreta2.value,
        isCorrectAnswer: false,
      },
      {
        text: respIncorreta3.value,
        image: imgRespIncorreta1.value,
        isCorrectAnswer: false,
      }
    ]
    }
    )
  }
console.log(meuQuizz)
  }

    let respostaCorreta; 
    let respostaIncorreta1; 
    let respostaIncorreta2; 
    let respostaIncorreta3; 
function verificarPerguntas() {
  for (let i = 0; i < qntPerguntas.value; i++) {
    perguntaAtual = meuQuizz.questions[i]
    respostaCorreta = perguntaAtual.answers[0].text
    respostaIncorreta1 = perguntaAtual.answers[1].text
    respostaIncorreta2 = perguntaAtual.answers[2].text
    respostaIncorreta3 = perguntaAtual.answers[3].text
    
    if (perguntaAtual.title.length < 20) {
      alert("Preencha os dados corretamente");
      return;
    }
    if (respostaCorreta === null) {
      alert("Preencha os dados corretamente");
      return;
    }

    if (respostaCorreta === null && (respostaIncorreta1 === null || respostaIncorreta2 === null || respostaIncorreta3 === null)) {
      alert("Preencha os dados corretamente");
      return;
    }
  }
  criarNiveis();
}

function criarNiveis() {
  const BodyDiv = document.querySelector(".main1");
  BodyDiv.innerHTML = "";
  BodyDiv.innerHTML = `<div class="criarQuizz criacaoTela3">
  <h1>Crie seus níveis</h1>`;

  for (let i = 1; i <= qntNiveis.value; i++) {
    const lanesNiveis = `
    <div class="niveis num${i}">
    <div class="teste">
    <span>Nivel ${i}</span>
    <ion-icon name="create-outline" onclick="editarNiveis(this)"></ion-icon>
    </div>
  `;
    BodyDiv.querySelector(".criarQuizz").innerHTML += lanesNiveis;
  }
  BodyDiv.querySelector(
    ".criarQuizz"
  ).innerHTML += `<div class="prosseguir" onclick="validacaoNiveis()">Finalizar Quizz</div>
  </div>`; 
  }
  

function editarNiveis(elemento) {
  elemento.classList.add("escondido");
  const classeAcima = elemento.parentNode.parentNode;
  classeAcima.innerHTML += `
  <div class="niveisDetalhados">
    <input type="text" placeholder="Título do nível" />
    <input type="number" placeholder="% acerto mínima" />
    <input type="url" placeholder="URL da imagem do nível" />
    <input type="text" placeholder="Descrição do nível" />
    </div>
      `;
}

let tituloNivel;
let qntAcertos;
let urlImagemNivel;
let descricaoNivel;
function validacaoNiveis() {
  criarObjetoNiveis();
  verificarNiveis();
}

function criarObjetoNiveis() {
  meuQuizz.levels = [];
  for (let i = 1; i <= qntNiveis.value; i++) {
  tituloNivel = document.querySelector(`.num${i} .niveisDetalhados :nth-child(1)`);
  qntAcertos = document.querySelector(`.num${i} .niveisDetalhados :nth-child(2)`);
  urlImagemNivel = document.querySelector(`.num${i} .niveisDetalhados :nth-child(3)`);
  descricaoNivel = document.querySelector(`.num${i} .niveisDetalhados :nth-child(4)`);
  meuQuizz.levels.push(
      {
        title: tituloNivel.value,
        image: urlImagemNivel.value,
        text: descricaoNivel.value,
        minValue: qntAcertos.value
      }
  )
  }
  console.log(meuQuizz)
}

let nivelTitulo;
let nivelImagem;
let nivelTexto;
let nivelAcertos;

function verificarNiveis () {
  for (let i = 0; i < qntNiveis.value; i++) {
    let nivelaAtual = meuQuizz.levels[i]
    nivelTitulo = nivelaAtual.title
    nivelImagem = nivelaAtual.image
    nivelTexto = nivelaAtual.text
    nivelAcertos = nivelaAtual.minValue

  if (nivelTitulo.length < 10) {
    alert("Preencha os dados corretamente");
    return;
  }

  if (nivelAcertos < 0 || nivelAcertos > 100) {
    alert("Preencha os dados corretamente");
    return;
  }

  if (nivelTexto.length < 30) {
    alert("Preencha os dados corretamente");
    return;
  }
}
  finalizarQuizz();
}

function finalizarQuizz() {
  salvarQuizz();
  const BodyDiv = document.querySelector(".main1");
  BodyDiv.innerHTML = "";

  const novoQuizz = `
    <div class="criarQuizz criacaotela4">
    <h1>Seu quizz está pronto!</h1>
    <div class="quizzCriado">
    <img src="${meuQuizz.image}"/>
    <div class="tituloTelaFinal">${meuQuizz.title}</div>
    </div>
    <div class="prosseguir" onclick="acessarQuizz()">Acessar Quizz</div>
    <h2 onclick="voltarHome()">Voltar para home </h2>
    </div> 
      `;

  BodyDiv.innerHTML = novoQuizz;
}

function salvarQuizz () {
  const promise = axios.post ("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", meuQuizz);
  promise.then(devolveQuizzCompleto);
  promise.catch(retornaErro); 
}

function devolveQuizzCompleto(resposta) {
  const idQuizz = resposta.id
  console.log(resposta.id)
  const promise = axios.get (`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/idQuizz`)
  renderizarMeuQuizz()
}

function renderizarMeuQuizz () {
  console.log("vai renderizar")
}

function retornaErro() {
  console.log("deu erro")
}

function voltarHome() {
  window.location.reload();
}

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
  console.log(qntPerguntas.value);
  meuQuizz.questions = [];
  for (let i = 1; i <= qntPerguntas.value; i++) {
   tituloPergunta = document.querySelector(`.num${i} .perguntasDetalhadas :nth-child(1)`)
   corPergunta = document.querySelector(`.num${i} .perguntasDetalhadas :nth-child(2)`)
   meuQuizz.questions.push( {
    title: tituloPergunta.value,
    color: corPergunta.value
})
console.log(meuQuizz)
  }
}
 


function criarNiveis() {
  const qntPerguntas = document.querySelector(".esqueletoQuizz :nth-child(4)");
  const BodyDiv = document.querySelector(".main1");
  BodyDiv.innerHTML = `<div class="criarQuizz criacaoTela3">
  <h1>Crie seus niveis</h1>`;

  for (let i = 1; i <= qntPerguntas.value; i++) {
    const lanesNiveis = `
    <div class="niveis">
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
    <div class="prosseguir" onclick="finalizarQuizz()">Finalizar Quizz</div>
    </div> 
    </div> 
      `;
}

function validacaoNiveis() {
  const tituloNivel = document.querySelector(".niveisDetalhados ::nth-child(1)");
  const qntAcertos = document.querySelector(".niveisDetalhados ::nth-child(2)");
  const urlImagemNivel = document.querySelector(".niveisDetalhados ::nth-child(3)");
  const descricaoNivel = document.querySelector(".niveisDetalhados ::nth-child(4)");

  if (tituloNivel.value.length < 10) {
    alert("Preencha os dados corretamente");
    return;
  }

  if (qntAcertos.value < 0 || qntAcertos.value > 100) {
    alert("Preencha os dados corretamente");
    return;
  }

  if (descricaoNivel.value.length < 30) {
    alert("Preencha os dados corretamente");
    return;
  }

  finalizarQuizz();
}

function finalizarQuizz() {
  const BodyDiv = document.querySelector(".main1");
  BodyDiv.innerHTML = "";

  const novoQuizz = `
    <div class="criarQuizz criacaotela4">
    <h1>Seu quizz está pronto!</h1>
    <div class="quizzCriado">
    <img src="img/Rectangle 36.png"/>
    
    </div>
    <div class="prosseguir" onclick="acessarQuizz()">Acessar Quizz</div>
    <h2 onclick="voltarHome()">Voltar para home </h2>
    </div> 
      `;

  BodyDiv.innerHTML = novoQuizz;
}

function acessarQuizz() {}

function voltarHome() {
  window.location.reload();
}

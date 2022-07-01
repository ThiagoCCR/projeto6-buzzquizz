function criarQuizz() {
  const BodyDiv = document.querySelector(".main1");
  BodyDiv.innerHTML = "";
  const criacaoQuizz = `
  <div class="criarQuizz criacaoTela1">
  <h1>Comece pelo começo</h1>
  <div class="esqueletoQuizz">
  <input type="text" placeholder="Título do seu quizz" />
  <input type="url" placeholder="URL da imagem do seu quizz" />
  <input type="number" placeholder="Quantidade de perguntas do quizz" />
  <input type="number" placeholder="Quantidade de níveis do quizz" />
  </div>
  <div class="prosseguir" onclick="validacaoBasica()">Prosseguir para criar perguntas</div>
  </div> 
    `;
    BodyDiv.innerHTML = criacaoQuizz;
}


function validacaoBasica() {
const titulo = document.querySelector(".esqueletoQuizz :nth-child(1)");
const urlImagem = document.querySelector(".esqueletoQuizz :nth-child(2)");
const qntPerguntas = document.querySelector(".esqueletoQuizz :nth-child(3)");
const qntNiveis = document.querySelector(".esqueletoQuizz :nth-child(4)");

  if (titulo.value.length < 20 || titulo.value.length > 65 || qntPerguntas.value < 3 || qntNiveis.value < 2)
    {
   return;
  } 
  criarPerguntas();
}
  

function criarPerguntas() {
  const qntPerguntas = document.querySelector(".esqueletoQuizz :nth-child(3)");
  const numPerguntas = qntPerguntas.value;
  console.log(numPerguntas)
  const BodyDiv = document.querySelector(".main1");
  BodyDiv.innerHTML = `<div class="criarQuizz criacaoTela2">
  <h1>Crie suas perguntas</h1>`;
  
  for (let i = 1; i <= qntPerguntas.value; i++) {
    const lanesPerguntas = `
  <div class="perguntas">
  <div class="teste">
  <span>Pergunta ${i}</span>
  <ion-icon name="create-outline" onclick="editarPerguntas(this)"></ion-icon>
  </div>
  `
    BodyDiv.querySelector(".criarQuizz").innerHTML += lanesPerguntas;
  }
  }


function editarPerguntas(elemento) {
  elemento.classList.add("escondido");
  const classeAcima = elemento.parentNode.parentNode
  classeAcima.innerHTML += `
  <input type="text" placeholder="Texto da pergunta" />
  <input type="text" placeholder="Cor de fundo da pergunta" />
  <span>Resposta correta</span>
  <input type="text" placeholder="Resposta correta" />
  <input type="url" placeholder="URL da imagem" />
  <span>Respostas incorretas</span>
  <input type="text" placeholder="Resposta incorreta 1" />
  <input type="url" placeholder="URL da imagem 1" />
  <input type="text" placeholder="Resposta incorreta 2" />
  <input type="url" placeholder="URL da imagem 2" />
  <input type="text" placeholder="Resposta incorreta 3" />
  <input type="url" placeholder="URL da imagem 3" />
  </div>
    `;
}

function criarNiveis() {
  const BodyDiv = document.querySelector(".main1");
  BodyDiv.innerHTML = "";

  const lanesNiveis = `
  <div class="criarQuizz criacaoTela2">
  <h1>Crie suas perguntas</h1>
  <div class="perguntas">
  <div class="teste">
  <span>Nivel 1</span>
  <ion-icon name="create-outline" onclick="editarNiveis()"></ion-icon>
  </div>
  `
    BodyDiv.innerHTML = lanesNiveis;
  }

  function editarNiveis () {
    const BodyDiv = document.querySelector(".main1");
  BodyDiv.innerHTML = "";

    const criacaoNiveis = `
    <div class="criarQuizz criacaoTela3">
    <h1>Agora, crie níveis</h1>
    <div class="niveis">
    <span>Nivel 1</span>
    <input type="text" placeholder="Título do nível" />
    <input type="number" placeholder="% acerto mínima" />
    <input type="url" placeholder="URL da imagem do nível" />
    <input type="text" placeholder="Descrição do nível" />
    </div>
    <div class="prosseguir" onclick="finalizarQuizz()">Finalizar Quizz</div>
    </div> 
      `;
      BodyDiv.innerHTML = criacaoNiveis;
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

  function acessarQuizz () {

  }

  function voltarHome () {
    window.location.reload()
  }


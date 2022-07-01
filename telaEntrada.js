let listaQuizz1 = [];
let listaQuizzUsuário1 = [];

function pegarQuizzAPI1() {
  const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
  promise.catch(erroNaAPi1);
  promise.then(popularListas1);
}

pegarQuizzAPI1();

function erroNaAPi1() {
  alert("Ocorreu um erro, os quizz não foram encontrados na API");
}

function popularListas1(promise) {
  listaQuizz1 = promise.data;
  renderizarTelaInicial1();
}

function renderizarTelaInicial1() {
  if (listaQuizzUsuário1.length === 0) {
    mostrarTelaSemQuizz1();
  } else {
    mostrarTelaCompleta1();
  }
}

function mostrarTelaSemQuizz1() {
  const bodyDiv = document.querySelector("body");
  const templateBody = `
        <div class="header">
            <h1>BuzzQuizz</h1>
        </div>
        <div class="main">
            <div class="conteudo-usuario">
                <div class="usuario-quizz">
                    <div class="titulo-botao">
                        <h2>Você não criou nenhum </br>quizz ainda :(</h2>
                        <button class="criar-quizz-g" onclick="criarQuizz1(this)">Criar Quizz</button>
                    </div>
                </div>
            </div>
            <div class="outros-quizz">
                <h3>Todos os Quizzes</h3>
                <div class="quizz-container"></div>
            </div>
        </div>`;

  bodyDiv.innerHTML += templateBody;

  for (let i = 0; i < listaQuizz1.length; i++) {
    let iterarQuizz = listaQuizz1[i];
    const quizContainerDiv = document.querySelector(".quizz-container");
    const templateQuizz = `
        <div class="quizz" onclick="abrirQuizz1()">
            <img src=${iterarQuizz.image}/>
            <div class="titulo-quizz">
                <p>${iterarQuizz.title}</p>
            </div>
        </div>`;
    quizContainerDiv.innerHTML += templateQuizz;
  }
}

function mostrarTelaCompleta1() {
  const bodyDiv = document.querySelector("body");
  const templateBody = `
        <div class="header">
            <h1>BuzzQuizz</h1>
        </div>
        <div class="main">
            <div class="conteudo-usuario">
                <div class="usuario-quizz-completo">
                    <div class="titulo-botao-completo">
                        <h3>Seus Quizzes</h3>
                        <ion-icon class="criar-quizz-p" name="add-circle"></ion-icon>
                    </div>
                    <div class="meu-quizz-container"></div>
                </div>
            </div>
            <div class="outros-quizz">
                <h3>Todos os Quizzes</h3>
                <div class="quizz-container"></div>
            </div>
        </div>`;

  bodyDiv.innerHTML += templateBody;

  for (let i = 0; i < listaQuizzUsuário1.length; i++) {
    let iterarQuizz = listaQuizzUsuário1[i];
    const quizContainerDiv = document.querySelector(".meu-quizz-container");
    const templateQuizz = `
        <div class="quizz" onclick="abrirQuizz1()">
            <img src=${iterarQuizz.image}/>
            <div class="titulo-quizz">
                <p>${iterarQuizz.title}</p>
            </div>
        </div>`;
    quizContainerDiv.innerHTML += templateQuizz;
  }
}

function abrirQuizz1() {
  const BodyDiv = document.querySelector("body");
  BodyDiv.innerHTML = "";

  //CHAMAR FUNÇÃO QUE APARECE A TELA DO QUIZZ: PENDING!
}

function criarQuizz1(elemento) {
const BodyDiv = document.querySelector(".main");
BodyDiv.innerHTML = "";
  criarQuizz();

  //BodyDiv.innerHTML = "";
  //CHAMAR FUNÇÃO QUE APARECE A TELA DE CRIAR QUIZZ: PENDING!
}


/* <div class="main">
        <div class="conteudo-usuario">
            <!-- <div class="usuario-quizz">
            <div class="titulo-botao">
                <h2>Você não criou nenhum </br>quizz ainda :(</h2>
                <button class="criar-quizz-g">Criar Quizz</button>
            </div>
        </div> -->
            <div class="usuario-quizz-completo">
                <div class="titulo-botao-completo">
                    <h3>Seus Quizzes</h3>
                    <ion-icon class="criar-quizz-p" name="add-circle"></ion-icon>
                </div>
                <div class="meu-quizz-container">
                    <div class="quizz">
                        <p class="titulo-quizz">O quanto você é de boas?</p>
                    </div>
                    <div class="quizz">
                        <p class="titulo-quizz">O quanto você é de boas?</p>
                    </div>
                    <div class="quizz">
                        <p class="titulo-quizz">O quanto você é de boas?</p>
                    </div>
                    <div class="quizz">
                        <p class="titulo-quizz">O quanto você é de boas?</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="outros-quizz">
            <h3>Todos os Quizzes</h3>
            <div class="quizz-container">
                <div class="quizz">
                    <p class="titulo-quizz">O quanto você é de boas?</p>
                </div>
                <div class="quizz">
                    <p class="titulo-quizz">O quanto você é de boas?</p>
                </div>
                <div class="quizz">
                    <p class="titulo-quizz">O quanto você é de boas?</p>
                </div>
                <div class="quizz">
                    <p class="titulo-quizz">O quanto você é de boas?</p>
                </div>
                <div class="quizz">
                    <p class="titulo-quizz">O quanto você é de boas?</p>
                </div>
                <div class="quizz">
                    <p class="titulo-quizz">O quanto você é de boas?</p>
                </div>
            </div>
        </div>
    </div> */

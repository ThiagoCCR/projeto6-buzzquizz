let listaQuizz1 = [];
let listaQuizzUsuário1 = [];


function pegarQuizzAPI1() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes');
    promise.catch(erroNaAPi1);
    promise.then(popularListas1);
}


pegarQuizzAPI1()


function erroNaAPi1() {
    alert('Ocorreu um erro, os quizz não foram encontrados na API');
}


function popularListas1(promise) {
    listaQuizz1 = promise.data;
    renderizarTelaInicial1()
}


function renderizarTelaInicial1() {
    if (listaQuizzUsuário1.length === 0) {
        mostrarTelaSemQuizz1();
    } else {
        mostrarTelaCompleta1();
    }
}


function mostrarTelaSemQuizz1() {
    const bodyDiv = document.querySelector('body');
    const templateBody =`
        <div class="header">
            <h1>BuzzQuizz</h1>
        </div>
        <div class="main1">
            <div class="conteudo-usuario1">
                <div class="usuario-quizz1">
                    <div class="titulo-botao1">
                        <h2>Você não criou nenhum </br>quizz ainda :(</h2>
                        <button class="criar-quizz-g1" onclick="criarQuizz1()">Criar Quizz</button>
                    </div>
                </div>
            </div>
            <div class="outros-quizz1">
                <h3>Todos os Quizzes</h3>
                <div class="quizz-container1"></div>
            </div>
        </div>`

    bodyDiv.innerHTML += templateBody;

    for (let i=0; i<listaQuizz1.length; i++){
        let iterarQuizz = listaQuizz1[i];
        const quizContainerDiv = document.querySelector('.quizz-container1');
        const templateQuizz = `
        <div class="quizz1" onclick="abrirQuizz1(${iterarQuizz.id})">
            <img src='${iterarQuizz.image}'/>
            <div class="titulo-quizz1">
                <p>${iterarQuizz.title}</p>
            </div>
        </div>`
        quizContainerDiv.innerHTML += templateQuizz;
    }
}


function  mostrarTelaCompleta1(){
    const bodyDiv = document.querySelector('body');
    const templateBody =`
        <div class="header">
            <h1>BuzzQuizz</h1>
        </div>
        <div class="main1">
            <div class="conteudo-usuario1">
                <div class="usuario-quizz-completo1">
                    <div class="titulo-botao-completo1">
                        <h3>Seus Quizzes</h3>
                        <ion-icon class="criar-quizz-p1" name="add-circle"></ion-icon>
                    </div>
                    <div class="meu-quizz-container1"></div>
                </div>
            </div>
            <div class="outros-quizz1">
                <h3>Todos os Quizzes</h3>
                <div class="quizz-container1"></div>
            </div>
        </div>`

    bodyDiv.innerHTML += templateBody;

    for (let i=0; i<listaQuizzUsuário1.length; i++){
        let iterarQuizz = listaQuizzUsuário1[i];
        const quizContainerDiv = document.querySelector('.meu-quizz-container1');
        const templateQuizz = `
        <div class="quizz1" onclick="abrirQuizz1()">
            <img src='${iterarQuizz.image}'/>
            <div class="titulo-quizz1">
                <p>${iterarQuizz.title}</p>
            </div>
        </div>`
        quizContainerDiv.innerHTML += templateQuizz;
    }

}



function abrirQuizz1(id){
    const BodyDiv = document.querySelector('body');
    idQuizz3 = id;
    BodyDiv.innerHTML = "";
    renderizarTela03();
}


function criarQuizz1() {
    const BodyDiv = document.querySelector(".main1");
    BodyDiv.innerHTML = "";
    criarQuizz();
    }

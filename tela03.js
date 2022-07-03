let idQuizz3;
let objQuizz3;


function renderizarTela03(element) {
    encontrarQuizz3();
}


function encontrarQuizz3() {
    for (let i = 0; i < listaQuizz1.length; i++) {
        let quizzIterado = listaQuizz1[i];
        if (idQuizz3 === quizzIterado.id) {
            objQuizz3 = quizzIterado;
        }
    }
    console.log(objQuizz3)

    pegarQuizzSelecionadoAPI3();
}


function pegarQuizzSelecionadoAPI3() {
    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idQuizz3}`);
    promise.catch(erroAoPegarQuizz3);
    promise.then(renderizarTela3);
}


function erroAoPegarQuizz3() {
    alert('Erro ao buscar o Quizz na API');
    window.location.reload();
}


function renderizarTela3(elemento) {
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
    </div>`

    const bodyDiv = document.querySelector('body');
    bodyDiv.innerHTML += templateTela3;

    renderizarQuestoes3();
}


function renderizarQuestoes3() {

    const bodyDiv = document.querySelector('body');
    const templateQuestoes = `
        <div class="questoes-container3">
           
        </div>`;
    bodyDiv.innerHTML += templateQuestoes;
    const caixaQuestaoDiv = document.querySelector('.questoes-container3');
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
            </div>`
        }

        let templateQuestaoBox = `
                <div class="caixa-questao3">
                    <div class="titulo-pergunta-3">
                        <p>${objQuizz3.questions[i].title}</p>
                    </div>
                    <div class="respostas3">${templateRepostas}</div>
                </div>`

        caixaQuestaoDiv.innerHTML += templateQuestaoBox;
    }

}

function randomizarQuestoes(){
    return Math.random() - 0.5;
}


function selecionarAlternativa(booleano, element){

    if (element.classList.contains('clicada')){
        return;
    }

    element.classList.add('clicada')

    const alternativaCorreta = element.parentNode.querySelector('p.true');
    const alternativaIncorreta = element.parentNode.querySelectorAll('p.false');

    alternativaCorreta.classList.add('green');

    for (let i=0; i< alternativaIncorreta.length; i++){
        alternativaIncorreta[i].classList.add('red');
    }

    let siblings = getSiblings(element);

    for (let i=0; i < siblings.length; i++){
        siblings[i].querySelector('.box-opacity').classList.add('opaco');
        siblings[i].classList.add('clicada');
    }


    const proximaQuestao = element.parentNode.parentNode.nextElementSibling;

    setTimeout(()=>{
    
        if (proximaQuestao !== null){
            proximaQuestao.scrollIntoView({behavior:'auto', block:'center', inline:'center'});
        }

    },2000)

}

function getSiblings(elem) {

    // Setup siblings array and get the first sibling
    var siblings = [];
    var sibling = elem.parentNode.firstChild;

    // Loop through each sibling and push to the array
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== elem) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling
    }

    return siblings;

}

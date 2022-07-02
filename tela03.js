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
    // window.location.reload();
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
        
        for (let y = 0; y < numRespostas; y++) {
            templateRepostas += `
            <div>
                <div class="resposta-img3">
                    <img src=${questao.answers[y].image}>
                </div>
                <div class="resposta-texto3">
                    <p>${questao.answers[y].text}</p>
                </div>
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



// <div class="main3">
//     <div class="titulo3">
//     </div>
//     <div class="questoes-container3">
//         <div class="caixa-questao3">
//             <div class="titulo-pergunta-3">
//                 <p>${objQuizz3.title}</p>
//             </div>
//             <div class="respostas3">
//                 <div>
//                     <div class="resposta-img3">
//                         <img src="./img/Rectangle 36.png">
//                     </div>
//                     <div class="resposta-texto3">
//                         <p>Teste teste Teste</p>
//                     </div>
//                 </div>
//                 <div>
//                     <div class="resposta-img3">
//                         <img src="./img/Rectangle 36.png">
//                     </div>
//                     <div class="resposta-texto3">
//                         <p>Teste teste Teste</p>
//                     </div>
//                 </div>
//                 <div>
//                     <div class="resposta-img3">
//                         <img src="./img/Rectangle 36.png">
//                     </div>
//                     <div class="resposta-texto3">
//                         <p>Teste teste Teste</p>
//                     </div>
//                 </div>
//                 <div>
//                     <div class="resposta-img3">
//                         <img src="./img/Rectangle 36.png">
//                     </div>
//                     <div class="resposta-texto3">
//                         <p>Teste teste Teste</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
const barraLateral = document.querySelector(".sidebar")

function menuClicado(){
    barraLateral.classList.toggle('open');
}

const quiz = document.querySelector("form")
function pegaResposta(num){
    const resposta = document.querySelector(`input[name="quiz${num}"]:checked`).value;

    //TODO: Pegar a resposta certa, verificar a resposta marcada e se elas batem
    //Então, aumentar a quantidade de acertos/meio acertos (se aplicável)
}

//TODO: Fazer a função que modifica a página de relatório com base nas respostas
const barraLateral = document.querySelector(".sidebar")
const quiz = document.querySelector("form")

function menuClicado(){
    barraLateral.classList.toggle('open');
}

function pegaResposta(){
    const resposta = document.querySelector('input[name="quiz1"]:checked').value;

    console.log(resposta)
}
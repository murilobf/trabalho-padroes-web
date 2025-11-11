const barraLateral = document.querySelector(".sidebar")
const quiz = document.querySelector("form")

function menuClicado(){
    barraLateral.classList.toggle('open');
}

function pegaResposta(num){
    const resposta = document.querySelector(`input[name="quiz${num}"]:checked`).value;

    //TODO: Pegar qual seria a resposta certa (talvez guardar também as que não estejam tão erradas), verificar a resposta marcada e bater com a certa
}
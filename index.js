const barraLateral = document.querySelector(".sidebar");
const modal = document.getElementById('modal-distracao');
const videoFoco = document.getElementById('video-foco') || 
                document.getElementById('video-foco-2') || 
                document.getElementById('video-foco-3') ||
                document.getElementById('video-foco-4') ||
                document.getElementById('video-foco-5');
const videoDistracao=document.getElementById('video-distracao');
let distracaoAtiva = false;
let modalJaDisparado = false;

let GATILHOS = [];

if (document.getElementById("video-foco")) {
    // Tela 1- rever logica de varios pop-ups
    GATILHOS = [
        { idElemento: 'modal-distracao', tempoDisparo: 5, tipo: 'modal' },
        { idElemento: 'modal-distracao', tempoDisparo: 10, tipo: 'modal' },
        { idElemento: 'modal-distracao', tempoDisparo: 15, tipo: 'modal' },
    ];
} else if (document.getElementById("video-foco-2")) {
    // Tela 2
    GATILHOS = [
        { idElemento: 'gif-carrey', tempoDisparo: 5, duracao: 4, tipo: 'gif', disparado: false },
        { idElemento: 'gif-miyagi', tempoDisparo: 15, duracao: 3, tipo: 'gif', disparado: false },
        {idElemento:'video-mine',tempoDisparo: 0, duracao: 200,tipo:'video', disparado:false }
    ];
} else if (document.getElementById("video-foco-3")) {
    // Tela 3
    GATILHOS = [
        { idElemento: 'botao-da-distracao', tempoDisparo: 180, duracao: 3, tipo: 'mudancaUI', disparado: false } ,
        {idElemento:'video-temple-run',tempoDisparo: 0, duracao: 200,tipo:'video', disparado:false }
    ];
} else if (document.getElementById("video-foco-4")) {
    // Tela 4
    GATILHOS = [
        { idElemento: 'distracao-progresso', tempoDisparo: 20, duracao: 3, tipo: 'progresso', disparado: false },
        {idElemento:'video-staying-alive',tempoDisparo: 83, duracao: 20,tipo:'video', disparado:false },
        {idElemento:'video-will-survive',tempoDisparo: 55, duracao: 3,tipo:'video', disparado:false },
        
    ];
}else if(document.getElementById("video-foco-5")){
     GATILHOS = [        
        {idElemento:'video-mine',tempoDisparo: 0, duracao: 200,tipo:'video', disparado:false }
    ];
}

function ativarModal(elemento) {
    if (!elemento || modalJaDisparado) return;

    modalJaDisparado = true;

    elemento.classList.add('modal-ativo');
    console.log('Modal ATIVADO.');
}

window.fecharModal = function () {
    if (!modal) return;
    modal.classList.remove('modal-ativo');

    setTimeout(() => { distracaoAtiva = false; }, 1000);
    console.log('Modal DESATIVADO');
}


function ativarGif(elemento, duracao) {
    if (!elemento || distracaoAtiva) return;

    distracaoAtiva = true;
    elemento.classList.add('gif-ativo');

    // Da pra botar distração sonara.
    // const distracaoSonora = document.getElementById('distracao-sonora'); 
    // if (distracaoSonora) distracaoSonora.play();

    console.log(`GIF/Distração Visual ATIVADA por ${duracao}s!`);

    setTimeout(() => {
        desativarGif(elemento);
    }, duracao * 1000);
}

function desativarGif(elemento) {
    elemento.classList.remove('gif-ativo');
    // parar distração sonora.
    // if (distracaoSonora) distracaoSonora.pause();
    console.log('GIF/Distração Visual DESATIVADA.');
    distracaoAtiva = false;
}

function ativarVideoDistracao(elemento,duracao){
    elemento.style.display = 'block';
    elemento.play();

    setTimeout(() => {
        elemento.pause();           
        elemento.style.display = 'none'; 
        elemento.currentTime = 0; 
    }, duracao * 1000); 

}

function mudarCorBotao(idBotao) {
    const botao = document.getElementById(idBotao);

    if (botao) {
        botao.style.backgroundColor = '#461b65ff';
        botao.style.transform = 'scale(1.1)';
        
        console.log('Distração de UI: Cor mudando suavemente via ID.');

        setTimeout(() => {
            botao.style.backgroundColor = ''; 
            botao.style.transform = '';
            
            console.log('Distração de UI: Voltando ao normal.');
        }, 3000);
    }
}

function distracaoProgresso() {
    const todasBolinhas = document.querySelectorAll('main nav svg circle');
    const bolinhaReal = document.querySelector('main nav svg circle.atual');

    if (!todasBolinhas.length || !bolinhaReal) return;

    bolinhaReal.classList.remove('atual');

    let indiceAleatorio;
    do {
        indiceAleatorio = Math.floor(Math.random() * todasBolinhas.length);
    } while (todasBolinhas[indiceAleatorio] === bolinhaReal);

    todasBolinhas[indiceAleatorio].classList.add('atual');
    
    console.log(`UI Distração: Progresso pulou para a bolinha ${indiceAleatorio + 1}`);

    setTimeout(() => {
        todasBolinhas[indiceAleatorio].classList.remove('atual');
        bolinhaReal.classList.add('atual');
        console.log("UI Distração: Progresso restaurado.");
    }, 2500);
}

if (videoFoco) {
    videoFoco.addEventListener('timeupdate', () => {
        const tempoAtual = videoFoco.currentTime;

        GATILHOS.forEach(gatilho => {
            const elemento = document.getElementById(gatilho.idElemento);
            if (elemento && !gatilho.disparado) { 
                if (tempoAtual >= gatilho.tempoDisparo) {
                    if (gatilho.tipo === 'modal') {
                        if (!modalJaDisparado && !distracaoAtiva) {                            
                            ativarModal(elemento);
                        }
                    } else if (gatilho.tipo === 'gif') {
                        if(!distracaoAtiva){
                            gatilho.disparado = true;
                            ativarGif(elemento, gatilho.duracao);
                        }
                    } else if (gatilho.tipo === 'mudancaUI') {
                        gatilho.disparado = true;
                        mudarCorBotao(gatilho.idElemento);
                    } else if (gatilho.tipo === 'progresso') {
                        gatilho.disparado = true;
                        distracaoProgresso();
                    }else if(gatilho.tipo='video') {
                        gatilho.disparado=true;
                        ativarVideoDistracao(elemento,gatilho.duracao);
                    }
                }
            }
        });
    });
}

function menuClicado() {
    barraLateral.classList.toggle('open');
}

function pegaResposta() {
    const resposta = document.querySelector('input[name="quiz1"]:checked').value;
    console.log(resposta)
}

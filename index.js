const barraLateral = document.querySelector(".sidebar");
const modal = document.getElementById('modal-distracao');
const videoFoco = document.getElementById('video-foco') || document.getElementById('video-foco-2');
let distracaoAtiva = false;
let modalJaDisparado = false;

let GATILHOS = [];

if (document.getElementById("video-foco")) {
    // Tela 1
    GATILHOS = [
        { idElemento: 'modal-distracao', tempoDisparo: 5, tipo: 'modal' },
    ];
} else if (document.getElementById("video-foco-2")) {
    // Tela 2
    GATILHOS = [
        { idElemento: 'gif-carrey', tempoDisparo: 5, duracao: 4, tipo: 'gif', disparado: false },
        { idElemento: 'gif-miyagi', tempoDisparo: 15, duracao: 3, tipo: 'gif', disparado: false }
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

if (videoFoco) {
    videoFoco.addEventListener('timeupdate', () => {
        const tempoAtual = videoFoco.currentTime;

        GATILHOS.forEach(gatilho => {
            const elemento = document.getElementById(gatilho.idElemento);

            if (elemento && !gatilho.disparado && !distracaoAtiva ) {
                if (tempoAtual >= gatilho.tempoDisparo) {

                    if (gatilho.tipo === 'modal') {
                        if (!modalJaDisparado) {
                            ativarModal(elemento);
                        }
                    } else if (gatilho.tipo === 'gif') {
                        gatilho.disparado = true;
                        ativarGif(elemento, gatilho.duracao);
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
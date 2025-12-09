const MOBILE_BREAKPOINT = 768;

function isMobile() {
    return window.innerWidth < MOBILE_BREAKPOINT;
}

const barraLateral = document.querySelector(".sidebar");
const modal = document.getElementById('modal-distracao');
const videoFoco = document.getElementById('video-foco') ||
    document.getElementById('video-foco-2') ||
    document.getElementById('video-foco-3') ||
    document.getElementById('video-foco-4') ||
    document.getElementById('video-foco-5');
const videoDistracao = document.getElementById('video-distracao');
let distracaoAtiva = false;
let modalJaDisparado = false;

let GATILHOS = [];

const videoElement = document.querySelector("video[id^='video-foco']");

const videoSrc = videoElement.querySelector("source").getAttribute("src");

const videoID = videoSrc.split("/").pop();

const storageKey = `video_assistido_${videoID}`;

document.addEventListener("DOMContentLoaded", () => {
    const jaAssistiu = localStorage.getItem(storageKey);

    if (jaAssistiu === "true") {
        videoElement.controls = false;
        videoElement.currentTime = videoElement.duration;
        videoElement.pause();
        videoElement.style.pointerEvents = "none";
        videoElement.style.opacity = 0.6;
    }
});

videoElement.addEventListener("ended", () => {
    videoElement.controls = false;
    videoElement.pause();
    localStorage.setItem(storageKey, "true");
});

if (document.getElementById("video-foco")) {
    if (isMobile()) {
        GATILHOS = [
            { idElemento: 'video-mario', tempoDisparo: 5, duracao: 17, tipo: 'video', disparado: false }
        ]
    }
    else {
        GATILHOS = [
            { idElemento: 'modal-distracao', tempoDisparo: 5, tipo: 'modal' },
            { idElemento: 'video-mario', tempoDisparo: 5, duracao: 17, tipo: 'video', disparado: false }
        ];
    }

} else if (document.getElementById("video-foco-2")) {
    if (isMobile()) {
        GATILHOS = [
            { idElemento: 'video-bike', tempoDisparo: 0, duracao: 20, tipo: 'video', disparado: false }
        ]
    }
    else {
        GATILHOS = [
            { idElemento: 'gif-carrey', tempoDisparo: 5, duracao: 4, tipo: 'gif', disparado: false },
            { idElemento: 'gif-miyagi', tempoDisparo: 15, duracao: 3, tipo: 'gif', disparado: false },
            { idElemento: 'video-bike', tempoDisparo: 0, duracao: 20, tipo: 'video', disparado: false }
        ];
    }
} else if (document.getElementById("video-foco-3")) {
    if (isMobile()) {
        GATILHOS = [
            { idElemento: 'botao-da-distracao', tempoDisparo: 180, duracao: 3, tipo: 'mudancaUI', disparado: false },
            { idElemento: 'video-mine', tempoDisparo: 0, duracao: 233, tipo: 'video', disparado: false },
        ]
    }
    else {
        GATILHOS = [
            { idElemento: 'botao-da-distracao', tempoDisparo: 180, duracao: 3, tipo: 'mudancaUI', disparado: false },
            { idElemento: 'video-mine', tempoDisparo: 0, duracao: 233, tipo: 'video', disparado: false },
            { idElemento: 'video-guitar', tempoDisparo: 142, duracao: 91, tipo: 'video', disparado: false }
        ];
    }
} else if (document.getElementById("video-foco-4")) {
    GATILHOS = [
        { idElemento: 'distracao-progresso', tempoDisparo: 20, duracao: 3, tipo: 'progresso', disparado: false },
        { idElemento: 'video-staying-alive', tempoDisparo: 83, duracao: 20, tipo: 'video', disparado: false },
        { idElemento: 'video-will-survive', tempoDisparo: 55, duracao: 3, tipo: 'video', disparado: false },

    ];
} else if (document.getElementById("video-foco-5")) {
    if (isMobile()) {
        GATILHOS = [
            { idElemento: 'video-temple-run', tempoDisparo: 0, duracao: 55, tipo: 'video', disparado: false },
        ]
    }
    else {
        GATILHOS = [
            { idElemento: 'video-temple-run', tempoDisparo: 0, duracao: 55, tipo: 'video', disparado: false },
            { idElemento: 'expressao-1', tempoDisparo: 0, duracao: 6, tipo: 'imagem', disparado: false },
            { idElemento: 'expressao-2', tempoDisparo: 7, duracao: 13, tipo: 'imagem', disparado: false },
            { idElemento: 'expressao-3', tempoDisparo: 15, duracao: 16, tipo: 'imagem', disparado: false },
            { idElemento: 'expressao-4', tempoDisparo: 19, duracao: 19, tipo: 'imagem', disparado: false }
        ];
    }
}

function ativarModal(elemento) {
    if (!elemento) return;

    elemento.classList.add('modal-ativo');
    setTimeout(() => {
        done();
    }, 4000);
}


window.fecharModal = function () {
    if (!modal) return;
    modal.classList.remove('modal-ativo');

    setTimeout(() => { distracaoAtiva = false; }, 1000);
    console.log('Modal DESATIVADO');
}

function ativarGif(elemento, duracao) {
    elemento.classList.add('gif-ativo');
    setTimeout(() => {
        elemento.classList.remove('gif-ativo');
        done();
    }, duracao * 1000);
}

function ativarVideoDistracao(elemento, duracao) {
    elemento.classList.add('ativo');
    elemento.play();

    setTimeout(() => {
        elemento.pause();
        elemento.currentTime = 0;
        elemento.classList.remove('ativo');
        done();
    }, duracao * 1000);
}

function ativarImagem(elemento, duracao) {
    elemento.classList.add('ativo');

    setTimeout(() => {
        elemento.classList.remove('ativo');
        done();
    }, duracao * 1000);
}

function desativarGif(elemento) {
    elemento.classList.remove('gif-ativo');
    console.log('GIF/Distração Visual DESATIVADA.');
    distracaoAtiva = false;
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
                    gatilho.disparado = true;
                    switch (gatilho.tipo) {
                        case 'modal':
                            ativarModal(elemento);
                            break;

                        case 'gif':
                            ativarGif(elemento, gatilho.duracao);
                            break;

                        case 'video':
                            ativarVideoDistracao(elemento, gatilho.duracao);
                            break;

                        case 'imagem':
                            ativarImagem(elemento, gatilho.duracao);
                            break;

                        case 'mudancaUI':
                            mudarCorBotao(gatilho.idElemento);
                            break;

                        case 'progresso':
                            distracaoProgresso();
                            break;
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

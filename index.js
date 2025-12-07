const barraLateral = document.querySelector(".sidebar");
const modal = document.getElementById('modal-distracao');
const videoFoco = document.getElementById('video-foco') || document.getElementById('video-foco-2') || document.getElementById('video-foco-3');
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
} else if (document.getElementById("video-foco-3")) {
    // Tela 3
    GATILHOS = [
        { idElemento: 'gif-carrey', tempoDisparo: 5, duracao: 4, tipo: 'gif', disparado: false },
        { idElemento: 'gif-miyagi', tempoDisparo: 15, duracao: 3, tipo: 'gif', disparado: false },
        { idElemento: 'botao-da-distracao', tempoDisparo: 180, duracao: 3, tipo: 'mudancaUI', disparado: false } 
    ];
} else if (document.getElementById("video-foco-4")) {
    // Tela 3
    GATILHOS = [
        { idElemento: 'gif-carrey', tempoDisparo: 5, duracao: 4, tipo: 'gif', disparado: false }
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

function mudarCorBotao(idBotao) {
    const botao = document.getElementById(idBotao);

    if (botao) {
        // 1. Salva a cor atual (caso queira garantir, mas geralmente limpar resolve)
        
        // 2. Aplica a nova cor direto no elemento
        // O navegador vai usar a regra 'transition' do CSS para fazer isso suavemente
        botao.style.backgroundColor = '#461b65ff'; // Laranja avermelhado
        botao.style.transform = 'scale(1.1)';    // Aumenta um pouco
        
        console.log('Distração de UI: Cor mudando suavemente via ID.');

        // 3. Depois de 3 segundos, limpamos o estilo inline
        setTimeout(() => {
            // Ao definir como string vazia '', o elemento volta a obedecer a cor do CSS original
            botao.style.backgroundColor = ''; 
            botao.style.transform = '';
            
            console.log('Distração de UI: Voltando ao normal.');
        }, 3000);
    }
}

if (videoFoco) {
    videoFoco.addEventListener('timeupdate', () => {
        const tempoAtual = videoFoco.currentTime;

        GATILHOS.forEach(gatilho => {
            // Verifica se é gatilho de UI ou elemento normal
            const elemento = document.getElementById(gatilho.idElemento);

            // Adicionei a verificação (!gatilho.disparado) para não repetir
            if ((elemento || gatilho.tipo === 'mudancaUI') && !gatilho.disparado) { 
                
                // Nota: Removi o !distracaoAtiva aqui para a cor do botão,
                // pois ela pode acontecer junto com um GIF se você quiser.
                // Se quiser que seja exclusivo, mantenha o && !distracaoAtiva.
                
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
                    } 
                    // NOVO: Lógica para mudança de UI
                    else if (gatilho.tipo === 'mudancaUI') {
                        gatilho.disparado = true;
                        mudarCorBotao(gatilho.idElemento);
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

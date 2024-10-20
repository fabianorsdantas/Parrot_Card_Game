let numeroDeCartas = Number(prompt('Bem vindo(a) ao Parrot Card Game! Para jogar, escolha um número par entre 4 e 14.'));
let arrayGifs = ['bobrossparrot', 'explodyparrot', 'fiestaparrot', 'metalparrot', 'revertitparrot', 'tripletsparrot', 'unicornparrot'];
let defaultArray = [...arrayGifs];
let contadorDeCliques = 0, contadorDeSelecao = 0;
let primeiraCarta, segundaCarta, intervalo, reiniciar;
const cartas = document.querySelector('.cards');

iniciarJogo();

function embaralharCartas() { return Math.random() - 0.5 }

function iniciarJogo() {
    while (isNaN(numeroDeCartas) || numeroDeCartas < 4 || numeroDeCartas > 14 || numeroDeCartas % 2 !== 0) {
        numeroDeCartas = Number(prompt('Insira apenas NUMEROS PARES de 4 a 14!'));
    }
    escolherGifs();
}

function escolherGifs() {
    arrayGifs.sort(embaralharCartas);
    arrayGifs = arrayGifs.slice(0, (numeroDeCartas / 2));
    arrayGifs = arrayGifs.concat(arrayGifs);
    arrayGifs.sort(embaralharCartas);
    adicionarCartas();
}

function adicionarCartas() {
    for (let i = 0; i < arrayGifs.length; i++) {
        cartas.innerHTML += `
            <div class="card" onclick="ativarCarta(this)">
                <div class="front-face face">
                    <img src="img/back.png" alt="front">
                </div>
                <div class="back-face face">
                    <img src="img/${arrayGifs[i]}.gif" alt="${arrayGifs[i]}">
                </div>
            </div>
        `;
    }
}

function ativarCarta(element) {
    if(element.classList.contains('active')){
        return;
    } 

    if(contadorDeSelecao === 0) {
        primeiraCarta = element;
        primeiraCarta.classList.add('active');
        contadorDeSelecao++, contadorDeCliques++;
    } else if(contadorDeSelecao === 1) {
        segundaCarta = element;
        segundaCarta.classList.add('active');
        contadorDeSelecao++, contadorDeCliques++;
        setTimeout(compararCartas, 1000);
    } 
}

function compararCartas() {
    if(primeiraCarta.querySelector('.back-face img').src !== segundaCarta.querySelector('.back-face img').src) {
        primeiraCarta.classList.remove('active'), segundaCarta.classList.remove('active');
        contadorDeSelecao = 0;
    } 
    else {
        contadorDeSelecao = 0;
    }
        
    if (document.querySelectorAll('.active').length === numeroDeCartas){
       finalizarJogo();
    }
       
}

function finalizarJogo() {
    alert(`Você ganhou em ${contadorDeCliques} jogadas.`);
    do {
        reiniciar = prompt('Gostaria de reiniciar o jogo? (Digite sim ou não)').toLowerCase();
    } 
    
    while(reiniciar !== 'não' && reiniciar !== 'sim'){
        if(reiniciar === 'sim') {
            resetarVariaveis();
        }
        else if(reiniciar === 'não') {
                clearInterval(intervalo);
                alert('Fim do jogo!');
    }
   
    }
}

function resetarVariaveis() {
    contadorDeCliques = 0;
    arrayGifs = [...defaultArray];
    cartas.innerHTML = '';
    numeroDeCartas = Number(prompt('Insira numeros pares de 4 a 14'));
    iniciarJogo();
}
$('.creditos').on('click', function () {
    $('.tela-creditos').toggleClass('escondido');
    var divcredito = document.querySelector("#creditos");
    divcredito.classList.add("blurdiv");
    document.querySelector("#iframeCredito").src = "../../CREDITOS/creditos_iframe.html";
});

$('.fechar-creditos').on('click', function () {
    $('.tela-creditos').toggleClass('is-hidden');
    window.parent.document.querySelector("#iframeCredito").src = "";
});

var tentativas=0;
var countTentativas=0;
const telaentrada = document.querySelector(".telaEntrada");
const tela1 = document.querySelector(".tela1");
const tela2 = document.querySelector(".tela2");
const tela3 = document.querySelector(".tela3");
const tela4 = document.querySelector(".tela4");
const telaVideo1 = document.querySelector(".video1");
const telaVideo2 = document.querySelector(".video2");

const objFase1 = document.querySelector(".fase1");
const objFase2 = document.querySelector(".fase2");
const objFase3 = document.querySelector(".fase3");
var respFase1 = objFase1.querySelectorAll(".caixaResp");
var checkFase1 = objFase1.querySelectorAll("input[type='checkbox']");
var respFase2 = objFase2.querySelectorAll(".caixaResp");
var checkFase2 = objFase2.querySelectorAll("input[type='checkbox']");
var respFase3 = objFase3.querySelectorAll(".caixaResp");
var checkFase3 = objFase3.querySelectorAll("input[type='checkbox']");

const modalFeedback = document.querySelector(".modalFeedback");
const modalFim = document.querySelector(".modalFim");
const feedBack = document.querySelector(".feedBack");
const feedBackFim = document.querySelector(".feedBackFim");

const modalMakingOff = document.querySelector(".modalMakingOff");

function abreMakingoff() {
    modalMakingOff.style.display = "flex";
}
function iniciaJogo() {
    telaentrada.classList.add("escondido");
    tela1.classList.remove("escondido");
    document.querySelector("#v1").play();
    anime({
        targets: telaVideo1,
        translateY: [1080, 0],
        duration: 750,
        easing: 'easeOutExpo',
        complete: function () {
            console.log("Animation completed");
        }
    });
}
function voltaVideo() {
    telaVideo1.classList.remove("escondido");
    telaVideo2.classList.add("escondido");
    document.querySelector("#v1").play();
    document.querySelector("#v2").pause();
    anime({
        targets: telaVideo1,
        translateY: [1080, 0],
        duration: 750,
        easing: 'easeOutExpo'
    });

}
function pulaVideo() {
    document.querySelector("#v2").play();
    document.querySelector("#v1").pause();
    telaVideo1.classList.add("escondido");
    telaVideo2.classList.remove("escondido");
    anime({
        targets: telaVideo2,
        translateY: [1080, 0],
        duration: 750,
        easing: 'easeOutExpo'
    });

}
function pulaFase1() {
    tela2.classList.add("escondido");
    modalFeedback.style.display = "none";
    tela3.classList.remove("escondido");
    anime({
        targets: tela3,
        translateY: [1080, 0],
        duration: 750,
        easing: 'easeOutExpo'
    });
    for (let i = 0; i < respFase2.length; i++) {
        const element = respFase2[i];
        console.log(element)
        anime({
            targets: element,
            scale: [0, 1],
            duration: 550,
            delay: 300 + i * 100,
            easing: 'easeOutExpo'
        });
    }
}
function pulaFase2() {
    tela3.classList.add("escondido");
    modalFeedback.style.display = "none";
    tela4.classList.remove("escondido");
    anime({
        targets: tela4,
        translateY: [1080, 0],
        duration: 750,
        easing: 'easeOutExpo'
    });
    for (let i = 0; i < respFase3.length; i++) {
        const element = respFase3[i];
        console.log(element)
        anime({
            targets: element,
            scale: [0, 1],
            duration: 550,
            delay: 300 + i * 100,
            easing: 'easeOutExpo'
        });
    }
}
function pulaFim() {
    //tela4.classList.add("escondido");
    modalFeedback.style.display = "none";
    modalFim.style.display = "flex";
    if(countTentativas>0){
        document.querySelectorAll(".txtFeed")[1].textContent = "Você respondeu todas corretamente, porém, com ajuda :)";
    }
    
    anime({
        targets: modalFim,
        translateY: [1080, 0],
        duration: 750,
        easing: 'easeOutExpo'
    });
}
function pulaParaQuestoes() {
    telaentrada.classList.add("escondido");
    document.querySelector("#v2").pause();
    document.querySelector("#v1").pause();
    tela1.classList.add("escondido");
    tela2.classList.remove("escondido");
    anime({
        targets: tela2,
        translateY: [1080, 0],
        duration: 750,
        easing: 'easeOutExpo'
    });
    for (let i = 0; i < respFase1.length; i++) {
        const element = respFase1[i];
        console.log(element)
        anime({
            targets: element,
            scale: [0, 1],
            duration: 550,
            delay: 300 + i * 100,
            easing: 'easeOutExpo'
        });
    }


}
function cliqueResposta(evt) {
    evt.querySelector("input[type='checkbox']").checked = !evt.querySelector("input[type='checkbox']").checked;
    console.log(evt.getAttribute("data-gabarito"));

    for (var i = 0; i < respFase1.length; i++) {
        if (respFase1[i].getAttribute('data-gabarito') === 'checked') {
            console.log(respFase1[i].getAttribute('data-gabarito'));
        }
    }
    anime({
        targets: evt,
        translateY: [20, 0],
        duration: 750,
        easing: 'easeOutExpo'
    });

}
function verificarGabaritoFase1() {
    verificarGabarito(respFase1, checkFase1, ".btAvancaFase1");
}
function verificarGabaritoFase2() {
    verificarGabarito(respFase2, checkFase2, ".btAvancaFase2");
}
function verificarGabaritoFase3() {
    verificarGabarito(respFase3, checkFase3, ".btAvancaFase3");
}
function verificarGabarito(_resp, _check, _btAvanca) {
    var respFaseAll = document.querySelectorAll(".caixaResp");
    for (let i = 0; i < respFaseAll.length; i++) {
        if (respFaseAll[i].getAttribute('data-gabarito') === 'true') {

        respFaseAll[i].style.backgroundColor = "#ffffff";

        }
        
    }

    document.querySelector(".btAvancaFase1").style.display = "none";
    document.querySelector(".btAvancaFase2").style.display = "none";
    document.querySelector(".btAvancaFase3").style.display = "none";
    modalFeedback.style.display = "flex";
    tentativas++;
    if(tentativas>3){
        tentativas=0;
        countTentativas+=1;
        document.querySelector(".btMostraRespostas").style.display = "block";

    }

    let iAll = 0;
    let iAcerto = 0;
    let iErro = 0;

    anime({
        targets: feedBack,
        translateY: [1080, 0],
        duration: 750,
        easing: 'easeOutExpo'
    });
    for (var i = 0; i < _resp.length; i++) {
        if (_resp[i].getAttribute('data-gabarito') === 'true') {
            iAll += 1;
        }

    }
    for (var i = 0; i < _resp.length; i++) {
        if (_check[i].checked) {
            console.log("respFase1[i].getAttribute('data-gabarito')", _resp[i].getAttribute('data-gabarito'));
            if (_resp[i].getAttribute('data-gabarito') === 'true') {
                iAcerto += 1; // Corrected variable name from iResp to iAcerto
            } else {
                iErro += 1;
            }
        }
    };
    if (iAcerto > 0 && iErro > 0) {
        document.querySelector(".txtFeed").textContent = "Você respondeu incorretamente algumas alternativas";
    } else if (iAcerto == 0 && iErro > 0) {
        document.querySelector(".txtFeed").textContent = "Você respondeu incorretamente TODAS as alternativas";
    } else if (iAcerto == iAll && iErro == 0) {
        document.querySelector(".txtFeed").textContent = "Você respondeu todas corretamente";
        document.querySelector(_btAvanca).style.display = "inline-block";
    } else {
        document.querySelector(".txtFeed").textContent = "Selecione apenas as corretas.";
    }
    console.log(iAcerto, iErro, iAll);

}
function btTentarNovamente(pode) {
    modalFeedback.style.display = "none";

    if(pode){
        document.querySelector(".btMostraRespostas").style.display = "none";
        var respFaseAll = document.querySelectorAll(".caixaResp");
        for (let i = 0; i < respFaseAll.length; i++) {
            if (respFaseAll[i].getAttribute('data-gabarito') === 'true') {

            respFaseAll[i].style.backgroundColor = "#b1e9a8";

            }
            
        }
    }
}
//pulaParaQuestoes()
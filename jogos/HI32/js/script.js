var armario1 = document.querySelector(".pers1");
var armario2 = document.querySelector(".cena01");
var imagemPrint1 = document.querySelector("#imagemPrint1");

var isMobile = false;

$(".creditos").on("click", function () {
  $(".tela-creditos").toggleClass("is-hidden");
  var divcredito = document.querySelector("#creditos");
  divcredito.classList.add("blurdiv");
  document.querySelector("#iframeCredito").src =
    "../../CREDITOS/creditos_iframe.html";
});
$(".fechar-creditos").on("click", function () {
  $(".tela-creditos").toggleClass("is-hidden");
  window.parent.document.querySelector("#iframeCredito").src = "";
});

$(".iniciar").on("click", function () {
  $(".abertura").addClass("hidden");
  $(".areaDrag").addClass("hidden");
  $(".tutorial").removeClass("hidden");
  $(".mobiletutorial").removeClass("hidden");
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    // Firefox
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
    // Chrome, Safari e Opera
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) {
    // IE/Edge
    document.documentElement.msRequestFullscreen();
  }
});

$(".entendi").on("click", function () {
  $(".tutorial").addClass("hidden");
  $(".mobiletutorial").addClass("hidden");
  $(".telaum").removeClass("hidden");
});

$(".entendimobile").on("click", function () {
  $(".mobiletutorial").addClass("hidden");
  $(".tutorial").addClass("hidden");
  isMobile = true;
  $(".telaum").removeClass("hidden");
});

$(document).ready(function () {
  var telaAtual = 1;
  var numTelas = $(".jogotela").length;

  $(".proximo").click(function () {
    if (telaAtual < numTelas) {
      $("#quest" + telaAtual).addClass("hidden");
      telaAtual++;
      $("#quest" + telaAtual).removeClass("hidden");

      armario1 = document.querySelector(".pers" + telaAtual);
      armario2 = document.querySelector(".cena0" + telaAtual);
      console.log(armario1, armario2);
    }
  });
});

$(".finalizar").on("click", function () {
  $(".jogotela").addClass("hidden");
  $(".telafinal").removeClass("hidden");
});

//RESET FINAL
$(".reiniciar").on("click", function () {
  location.reload();
});

//essas duas linhas sao a unica coisa que muda
$(".btRefazer").on("click", function () {
  //
  let elementos = armario2.querySelectorAll(".item");
  elementos.forEach((element) => {
    console.log(element);
    let translateVolta =
      "translate(" +
      element.getAttribute("data-x") +
      "vw, " +
      element.getAttribute("data-y") +
      "vw)";
    armario1.appendChild(element);
    element.style.transform = translateVolta;
  });
});



$(".btsalvar1").on("click", function () {

  html2canvas(document.querySelector("#imagemPrint1")).then((canvas) => {
    var canvasImg = canvas.toDataURL("image/jpg");
    var a = window.open("", "", "height=500", "width=500");
    a.document.write("<html>");
    a.document.write("<body>");
    a.document.write('<img src="' + canvasImg + '">');
    a.document.write("</body>");
    a.document.write("</html>");
    a.focus();
    a.print();
    a.document.close();
    setTimeout(() => {
      //a.print();
    }, 2000);
  });

});

$(".btsalvar2").on("click", function () {
  html2canvas(document.querySelector("#imagemPrint2")).then((canvas) => {
    var canvasImg = canvas.toDataURL("image/jpg");
    var a = window.open("", "", "height=500", "width=500");
    a.document.write("<html>");
    a.document.write("<body>");
    a.document.write('<img src="' + canvasImg + '">');
    a.document.write("</body>");
    a.document.write("</html>");
    a.document.close();
    setTimeout(() => {
      a.print();
    }, 2000);
  });
});

$(".btsalvar3").on("click", function () {
  html2canvas(document.querySelector("#imagemPrint3")).then((canvas) => {
    var canvasImg = canvas.toDataURL("image/jpg");
    var a = window.open("", "", "height=500", "width=500");
    a.document.write("<html>");
    a.document.write("<body>");
    a.document.write('<img src="' + canvasImg + '">');
    a.document.write("</body>");
    a.document.write("</html>");
    a.document.close();
    setTimeout(() => {
      a.print();
    }, 2000);
  });
});


//SCRIPT para arrastar e soltar:
//tela 1

const casa = document.querySelector(".casa");
const madeira = document.querySelector(".madeira");
const lobo = document.querySelector(".lobo");
const tijolo = document.querySelector(".tijolo");
const porquinhobrinquedo = document.querySelector(".porquinhobrinquedo");
const serrote = document.querySelector(".serrote");
const casaporquinho = document.querySelector(".casaporquinho");
const pedrinhas = document.querySelector(".pedrinhas");
const doisporquinhos = document.querySelector(".doisporquinhos");
//tela 2
const porquinhorelax = document.querySelector(".porquinhorelax");
const martelo = document.querySelector(".martelo");
const lobo_tela2 = document.querySelector(".lobo_tela2");
const pigtoy = document.querySelector(".pigtoy");
const machadinho = document.querySelector(".machadinho");
const bambu = document.querySelector(".bambu");
const porquinholendo = document.querySelector(".porquinholendo");
const corda = document.querySelector(".corda");
const feno = document.querySelector(".feno");
const paecimento = document.querySelector(".paecimento");
//tela 3
const porquinhovinil = document.querySelector(".porquinhovinil");
const porquinhoscombrinquedo = document.querySelector(
  ".porquinhoscombrinquedo"
);
const pigread = document.querySelector(".pigread");
const lobomauempe = document.querySelector(".lobomauempe");
const pigzen = document.querySelector(".pigzen");
//um pra cada div arrastavel

let offsetX,
  offsetY,
  dragging = false;
var objetoPegado;
var translateVolta;
let arraste = false;
var oedMobile = false;
if ("ontouchstart" in document.documentElement) {
  oedMobile = true;
}

if (oedMobile) {
  //pra cada div arrastavel
  casa.addEventListener("touchstart", pega);
  madeira.addEventListener("touchstart", pega);
  lobo.addEventListener("touchstart", pega);
  tijolo.addEventListener("touchstart", pega);
  porquinhobrinquedo.addEventListener("touchstart", pega);
  serrote.addEventListener("touchstart", pega);
  casaporquinho.addEventListener("touchstart", pega);
  pedrinhas.addEventListener("touchstart", pega);
  doisporquinhos.addEventListener("touchstart", pega);
  //tela 2
  porquinhorelax.addEventListener("touchstart", pega);
  martelo.addEventListener("touchstart", pega);
  lobo_tela2.addEventListener("touchstart", pega);
  pigtoy.addEventListener("touchstart", pega);
  machadinho.addEventListener("touchstart", pega);
  bambu.addEventListener("touchstart", pega);
  porquinholendo.addEventListener("touchstart", pega);
  corda.addEventListener("touchstart", pega);
  feno.addEventListener("touchstart", pega);
  paecimento.addEventListener("touchstart", pega);
  //tela 3
  porquinhovinil.addEventListener("touchstart", pega);
  porquinhoscombrinquedo.addEventListener("touchstart", pega);
  pigread.addEventListener("touchstart", pega);
  lobomauempe.addEventListener("touchstart", pega);
  pigzen.addEventListener("touchstart", pega);
} else {
  casa.addEventListener("mousedown", pega);
  madeira.addEventListener("mousedown", pega);
  lobo.addEventListener("mousedown", pega);
  tijolo.addEventListener("mousedown", pega);
  porquinhobrinquedo.addEventListener("mousedown", pega);
  serrote.addEventListener("mousedown", pega);
  casaporquinho.addEventListener("mousedown", pega);
  pedrinhas.addEventListener("mousedown", pega);
  doisporquinhos.addEventListener("mousedown", pega);
  //tela 2
  porquinhorelax.addEventListener("mousedown", pega);
  martelo.addEventListener("mousedown", pega);
  lobo_tela2.addEventListener("mousedown", pega);
  pigtoy.addEventListener("mousedown", pega);
  machadinho.addEventListener("mousedown", pega);
  bambu.addEventListener("mousedown", pega);
  porquinholendo.addEventListener("mousedown", pega);
  corda.addEventListener("mousedown", pega);
  feno.addEventListener("mousedown", pega);
  paecimento.addEventListener("mousedown", pega);
  //tela 3
  porquinhovinil.addEventListener("mousedown", pega);
  porquinhoscombrinquedo.addEventListener("mousedown", pega);
  pigread.addEventListener("mousedown", pega);
  lobomauempe.addEventListener("mousedown", pega);
  pigzen.addEventListener("mousedown", pega);
}

if (oedMobile) {
  document.addEventListener("touchmove", move);
  document.addEventListener("touchstart", solta);
} else {
  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", solta);
}

function solta(e) {
  let _clientx;
  let _clienty;
  if (oedMobile) {
    _clientx = e.changedTouches[0].clientX;
    _clienty = e.changedTouches[0].clientY;
  } else {
    _clientx = e.clientX;
    _clienty = e.clientY;
  }
  if (arraste) {
    arraste = !arraste;
    const dropAreaRect = armario2.getBoundingClientRect();
    const objRect = objetoPegado.getBoundingClientRect();
    if (
      _clientx >= dropAreaRect.left &&
      _clientx <= dropAreaRect.right &&
      _clienty >= dropAreaRect.top &&
      _clienty <= dropAreaRect.bottom
    ) {
      //objetoPegado.style.left = `${_clientx - dropAreaRect.left}px`;
      //objetoPegado.style.top = `${_clienty - dropAreaRect.top}px`;
      objetoPegado.style.transform = `translate(${_clientx - dropAreaRect.left - objRect.width / 2
        }px, ${_clienty - dropAreaRect.top - objRect.height / 2}px)`;
      armario2.appendChild(objetoPegado);
      objetoPegado.style.position = "absolute";
    } else {
      armario1.appendChild(objetoPegado);
      objetoPegado.style.transform = translateVolta;
    }
    dragging = false;
    //dragDiv.style.cursor = 'grab';

    //
    //animateCSS(objetoPegado, 'tada');
    objetoPegado = null;

  }
}

function pega(e) {
  objetoPegado = this;
  translateVolta =
    "translate(" +
    objetoPegado.getAttribute("data-x") +
    ", " +
    objetoPegado.getAttribute("data-y") +
    ")";
  document.querySelector(".areaDrag").appendChild(objetoPegado);
  objetoPegado.style.transform = `translate(0px, 0px)`;
  objetoPegado.style.position = "absolute";

  arraste = !arraste;
  move(e);
}

function move(e) {
  if (!arraste) return;
  let _clientx;
  let _clienty;
  if (oedMobile) {
    _clientx = e.changedTouches[0].clientX;
    _clienty = e.changedTouches[0].clientY;
  } else {
    _clientx = e.clientX;
    _clienty = e.clientY;
  }
  const objRect = objetoPegado.getBoundingClientRect();

  let largura = objRect.width / 2;
  let altura = objRect.height / 2;
  let x = _clientx - largura;
  let y = _clienty - altura;

  if (isMobile) {
    x = _clientx - 30;
    y = _clienty - 30;
  }

  objetoPegado.style.transform = `translate(${x}px, ${y}px)`;
}

const animateCSS = (element, animation, prefix = "animate__") =>
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = element;
    console.log("anima", element);
    node.classList.add(`${prefix}animated`, animationName);

    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });

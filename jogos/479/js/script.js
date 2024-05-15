//cada div de fundo deve ter uma div com os textos para que tenha a sincronia da animacao com texto


// divs com as pinturas que serao animadas
// essa parte pode ser dinamica fazendo querySelectorAll mas deixei assim pra ficar mais facil de visualizar

var pintura2 = document.querySelector(".pintura2");
var pintura3 = document.querySelector(".pintura3");
var pintura4 = document.querySelector(".pintura4");
var pintura5 = document.querySelector(".pintura5");
var pintura6 = document.querySelector(".pintura6");
var pintura7 = document.querySelector(".pintura7");
var pintura8 = document.querySelector(".pintura8");

//pega o tamanho total do body para usar como tempo da animacao
var tamanhoBody = document.body.clientHeight;

//timeline do animejs com propriedades de tempo, e easing
var tl = anime.timeline({
  duration: tamanhoBody,
  autoplay: false,
  easing: 'linear',
});

//aqui adicionamos cada div que sera animada sequencialmente, ao terminar a primeira ja engata a segunda e assim por diante
tl
  .add({
    targets: pintura2,
    opacity: 1,
    scale:1.3
  })
  .add({
    targets: pintura3,
    opacity: 1
    
  })
  .add({
    targets: pintura4,
    opacity: 1,
  })
  .add({
    targets: pintura5,
    opacity: 1,
  })
  .add({
    targets: pintura6,
    opacity: 1,
  })
  .add({
    targets: pintura7,
    opacity: 1,
  })
  .add({
    targets: pintura8,
    opacity: 1,
  })

//funcao que peguei pronta que calcula o tamanho total do body e converte em porcentagem
function getScrollPercent() {
  var h = document.documentElement,
    b = document.body,
    st = 'scrollTop',
    sh = 'scrollHeight'
  return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100
}

// pega evento de scroll
window.addEventListener('scroll', () => {
	const porcentagem = getScrollPercent();
  //seek é a propriedade da biblioteca 
	tl.seek(tl.duration * (porcentagem * 0.01))
})

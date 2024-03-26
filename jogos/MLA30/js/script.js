const editMode = false;
const telasTodas = document.querySelectorAll(".telas");
const pecasTodas = document.querySelectorAll(".pecas");
let nomepeca;
let boolpeca;
const myCanvas = document.getElementById('myCanvas');
var canvasRect = myCanvas.getBoundingClientRect();
const aspectRatio = window.innerWidth / window.innerHeight;

var canvas;
var stage;
var contentTudo;
var content;
var contenthit;
var contentgui;
var contentHelp;
var fase = 0;
var agua;
var score;
var pecas = [];
var edgeOffset = -20;
var count = 0;
var erro = 0;
var update = true;
var clicavel = true;
var i_erros = 0;
var i_acertos = 0;
var objSelect;
var caminho = "assets/";
let hasExecuted = false;
canvas = document.getElementById("myCanvas");
stage = new createjs.Stage(canvas);
stage.enableMouseOver(10);
createjs.Touch.enable(stage);
contentfundos = new createjs.Container();
contenthit = new createjs.Container();
contentTudo = new createjs.Container();
content = new createjs.Container();
contentgui = new createjs.Container();
contentHelp = new createjs.Container();


stage.addChild(contentTudo);
contentTudo.addChild(contentfundos);
contentTudo.addChild(contenthit);
contentTudo.addChild(content);
contentTudo.addChild(contentHelp);


var explica = new createjs.Bitmap(caminho + "fundoExerc01.png");
explica.scaleX = explica.scaleY = 0.7;
contentfundos.addChild(explica);



// Função genérica para ocultar uma tela e mostrar a próxima
function mostraProximaTela(telaAtual, proximaTela) {
  document.querySelector(telaAtual).classList.add('hidden');
  document.querySelector(proximaTela).classList.remove('hidden');
}
//MOSTRA TELA 1
function escondeTelaInicial() {
  document.querySelector('.telaInicial').classList.add('hidden');
  telasTodas[0].classList.remove('hidden');
}
//////////////

function retiraExplica() {
  //document.querySelector('.explica').classList.add('hidden');
}
function retiraExplicaGirar() {
  //document.querySelector('.explicaGirar').classList.add('hidden');
}
///////////////
function updateCanvasSize() {
  myCanvas.width = window.innerWidth;
  myCanvas.height = window.innerHeight;

  if (aspectRatio > 1) {
    contentTudo.x = window.innerWidth / 2 - 650;
    contentTudo.y = window.innerHeight / 2 - 400;
    explica.x = 150;
    explica.y = 200;
  } else {
    //455
    contentTudo.scaleX = contentTudo.scaleY = 0.65;
    contentTudo.x = window.innerWidth / 2 - 390;
    contentTudo.y = 10;
    explica.x = 400;
    explica.y = 400;
  }

}
updateCanvasSize();
window.addEventListener('resize', updateCanvasSize);

////////////ITENS de fase com informacoes dos objetos e indicando FIM
var itens = [
  {
    titulo: "Fase1",
    fundofase: "fundoExerc01b.png",
    fundofaseX: 379,
    fundofaseY: 70,
    rotacoes: 90,
    gabarito: [
      { peca: "TriangleGreen.png", posicao: [611, 139], rotacao: [180], rotacionavel: true },
      { peca: "TriangleGreen.png", posicao: [763, 267], rotacao: [0], rotacionavel: true },
      { peca: "TriangleGreen.png", posicao: [763, 398], rotacao: [180], rotacionavel: true },
      { peca: "TriangleGreen.png", posicao: [610, 525], rotacao: [0], rotacionavel: true },
      { peca: "TriangleGreen.png", posicao: [458, 397], rotacao: [180], rotacionavel: true },
      { peca: "TriangleGreen.png", posicao: [458, 263], rotacao: [0], rotacionavel: true },
      { peca: "hexagonRed.png", posicao: [609, 332], rotacao: [0], rotacionavel: false }
    ]
  }, {
    titulo: "Fase2",
    fundofase: "fundoExerc02b.png",
    fundofaseX: 359,
    fundofaseY: 70,
    rotacoes: 30,
    gabarito: [
      { peca: "quadradoAmarelo.png", posicao: [620, 141], rotacao: [0, 90, 180, 270], rotacionavel: true },
      { peca: "quadradoAmarelo.png", posicao: [781, 236], rotacao: [60, 150, 240, 330], rotacionavel: true },
      { peca: "quadradoAmarelo.png", posicao: [779, 425], rotacao: [30, 120, 210, 300], rotacionavel: true },
      { peca: "quadradoAmarelo.png", posicao: [619, 517], rotacao: [0, 90, 180, 270], rotacionavel: true },
      { peca: "quadradoAmarelo.png", posicao: [454, 425], rotacao: [60, 150, 240, 330], rotacionavel: true },
      { peca: "quadradoAmarelo.png", posicao: [455, 238], rotacao: [120, 210, 300, 30], rotacionavel: true },
      { peca: "hexagonRoxo.png", posicao: [616, 329], rotacao: [0, 90, 180, 270], rotacionavel: false }
    ]
  }, {
    titulo: "Fase3",
    fundofase: "fundoExerc03a.png",
    fundofaseX: 395,
    fundofaseY: 293,
    rotacoes: 90,
    gabarito: [
      { peca: "TriangleAmarelo.png", posicao: [504, 385], rotacao: [0], rotacionavel: true },
      { peca: "TriangleAmarelo.png", posicao: [611, 385], rotacao: [180], rotacionavel: true },
      { peca: "TriangleAmarelo.png", posicao: [718, 381], rotacao: [0], rotacionavel: false }
    ]
  }, {
    titulo: "Fase4",
    fundofase: "fundoExerc04a.png",
    fundofaseX: 395,
    fundofaseY: 192,
    rotacoes: 90,
    gabarito: [
      { peca: "TriangleAmarelo.png", posicao: [613, 283], rotacao: [180], rotacionavel: true },
      { peca: "TriangleAmarelo.png", posicao: [722, 282], rotacao: [0], rotacionavel: true },
      { peca: "TriangleAmarelo.png", posicao: [724, 459], rotacao: [180], rotacionavel: true },
      { peca: "TriangleAmarelo.png", posicao: [616, 459], rotacao: [0], rotacionavel: true },
      { peca: "TriangleAmarelo.png", posicao: [506, 460], rotacao: [180], rotacionavel: true },
      { peca: "TriangleAmarelo.png", posicao: [506, 284], rotacao: [0], rotacionavel: true }
    ]
  }, {
    titulo: "Fim",
  }
];

pecasTodas.forEach(element => {
  makeDragable(element);
});
function makeDragable(element) {
  element.draggable = true;
  element.addEventListener('dragstart', handleDragStart);

}
function handleDragStart(event) {
  nomepeca = event.target.dataset.nome;
  boolpeca = event.target.dataset.bool;
  canvasRect = myCanvas.getBoundingClientRect();
}
const targetCanvas = document.querySelector(".divCanvas");
targetCanvas.addEventListener("dragover", (event) => {
  event.preventDefault();
});
targetCanvas.addEventListener("drop", (event) => {
  event.preventDefault();
  //console.log("TESTE", canvasRect.offsetTop);
  criaPeca(nomepeca, boolpeca, event.pageX - canvasRect.left, event.pageY - canvasRect.top);
});





/////cria guias
for (var i = 0; i < itens[fase].gabarito.length; i++) {
  let _tipo = itens[fase].gabarito[i].peca;
  let _x = itens[fase].gabarito[i].posicao[0];
  let _y = itens[fase].gabarito[i].posicao[1];
  console.log(itens[fase].gabarito[i].rotacao);
  let _rot = itens[fase].gabarito[i].rotacao;
  let _rotacionavel = itens[fase].gabarito[i].rotacionavel;
  criaGuias(_tipo, _x, _y, _rot, _rotacionavel);
}
criaFundo();

clicavel = true;

stage.addChild(contentgui);
contentgui.visible = false;

createjs.Ticker.setFPS(60);
createjs.Ticker.addEventListener("tick", ticker);


/////////////////Funcao para pular de tela e identificar o fim
function pulaFase() {
  if (!hasExecuted) {
    hasExecuted = true;

    clicavel = false;
    fase++;
    console.log("PULA FASE", fase);
    if (itens[fase].titulo == "Fim") {
      document.querySelector('.thumbsUp1').classList.remove('hidden');
      document.querySelector('.parabens' + fase).classList.remove('hidden');
    } else {


      document.querySelector('.btnext' + fase).classList.add('hidden');
      document.querySelector('.btnextA' + fase).classList.remove('hidden');
      document.querySelector('.navegacao' + fase + 'a').classList.add('hidden');
      document.querySelector('.navegacao' + fase + 'b').classList.remove('hidden');

      document.querySelector('.textoBandeja' + fase).classList.add('hidden');
      //document.querySelector('.imagem1Bandeja' + fase).classList.add('hidden');
      //document.querySelector('.imagem2Bandeja' + fase).classList.add('hidden');
      document.querySelector('.parabens' + fase).classList.remove('hidden');
      document.querySelector('.thumbsUp1').classList.remove('hidden');
    }
  } else {
    console.log("pula ja foi executada...");
  }
}
function escondeTelaInteratividade() {
  document.querySelector('.thumbsUp1').classList.add('hidden');
  console.log('.telaInteratividade' + fase, '.telaInteratividade' + (fase + 1));
  mostraProximaTela('.telaInteratividade' + fase, '.telaInteratividade' + (fase + 1));
  contenthit.removeAllChildren();
  content.removeAllChildren();
  contentfundos.removeAllChildren();
  console.log("fase", fase);

  for (var i = 0; i < itens[fase].gabarito.length; i++) {
    let _tipo = itens[fase].gabarito[i].peca;
    let _x = itens[fase].gabarito[i].posicao[0];
    let _y = itens[fase].gabarito[i].posicao[1];

    let _rot = itens[fase].gabarito[i].rotacao;
    let _rotacionavel = itens[fase].gabarito[i].rotacionavel;
    criaGuias(_tipo, _x, _y, _rot, _rotacionavel);
  }


  criaFundo();
  //cria fase
  clicavel = true;
  hasExecuted = false;
  //encontra a div footer dentro da div mae e depois move a vic com o canvas
  //para a proxima tela
  var tela2 = document.querySelector('.telaInteratividade' + (fase + 1));
  var divfooter = tela2.querySelector('.footer');
  let cv = document.querySelector('.divCanvas');
  divfooter.appendChild(cv);
}
function criaFundo() {
  let fundofase = new createjs.Bitmap(caminho + itens[fase].fundofase);
  contentfundos.addChild(fundofase);
  fundofase.scaleX = fundofase.scaleY = 0.75;

  fundofase.x = itens[fase].fundofaseX;
  fundofase.y = itens[fase].fundofaseY;

  console.log("fundo");
  if (editMode) {
    _deb(fundofase);
  }
}
function confere() {
  let quant = itens[fase].gabarito.length;
  let acertos = 0;
  for (var i = 0; i < contenthit.numChildren; i++) {
    var child = contenthit.getChildAt(i);
    if (procuraObj(child)) {
      acertos += 1;
    }
  }
  if (acertos >= quant) {
    limpaHelpers();
    console.log("aaaaacertou, aqui pula de fase", acertos);
    clicavel = false;
    setTimeout(() => {
      pulaFase();
    }, 500);

  }
}
function procuraObj(_obj) {
  bol = false;
  for (var i = 0; i < content.numChildren; i++) {
    var child = content.getChildAt(i);
    //console.log(child,_obj)
    if (child && _obj) {
      let colisao = ndgmr.checkRectCollision(_obj, child);
      if (colisao) {
        if (_obj.name == child.name) {
          console.log(_obj.possibleTotations.length, child.rotation);
          for (let j = 0; j < _obj.possibleTotations.length; j++) {
            if (child.rotation == _obj.possibleTotations[j]) {
              bol = true;
              return true;
            }

          }

        }
      }
    }
  }
  return bol;
}

function criaGuias(_tipo, _x, _y, _rot, _rotacionavel) {
  let pecas_Co = new createjs.Bitmap(caminho + _tipo);
  pecas_Co.rotacionavel = _rotacionavel;
  pecas_Co.image.onload = function () {
    pecas_Co.regX = pecas_Co.getBounds().width / 2;
    pecas_Co.regY = pecas_Co.getBounds().height / 2;
  };
  contenthit.addChild(pecas_Co);

  pecas_Co.x = _x;
  pecas_Co.y = _y;


  pecas_Co.scaleX = pecas_Co.scaleY = 0.55;
  if (editMode) {
    _deb(pecas_Co);
    pecas_Co.alpha = 0.1;
  } else {
    pecas_Co.alpha = 0.01;
  }

  pecas_Co.rotation = _rot[0];
  pecas_Co.possibleTotations = _rot;
  pecas_Co.name = _tipo;


}
function criaPecaPre(event) {
  nomepeca = event.dataset.nome;
  boolpeca = event.dataset.bool;

  criaPeca(nomepeca, boolpeca, 500, 200);
}
function criaPeca(_tipo, _rotacionavel, _x, _y) {
  explica.visible = false;
  console.log("cria")
  pecas_Co = new createjs.Bitmap(caminho + _tipo);
  pecas_Co.rotacionavel = _rotacionavel;
  pecas_Co.image.onload = function () {
    pecas_Co.regX = pecas_Co.getBounds().width / 2;
    pecas_Co.regY = pecas_Co.getBounds().height / 2;
    pecas_Co.scaleX = 0;
    pecas_Co.scaleY = 0;
    createjs.Tween.get(pecas_Co).to({ scaleX: 0.75, scaleY: 0.75 }, 300, createjs.Ease.backOut);
  };
  if (aspectRatio > 1) {
    pecas_Co.x = 200;
  } else {
    pecas_Co.x = _x;
  }

  pecas_Co.y = _y;
  pecas_Co.name = _tipo;
  pecas_Co.pode = true;
  pecas_Co.scaleX = pecas_Co.scaleY = 0.75;
  content.addChild(pecas_Co);

  pecas_Co.on("mousedown", function (evt) {
    if (clicavel) {
      objSelect = this;
      limpaHelpers();
      this.parent.addChild(this);
      var global = content.localToGlobal(this.x, this.y);
      this.offset = { 'x': global.x - evt.stageX, 'y': global.y - evt.stageY };
    }
  });
  pecas_Co.on("pressmove", function (evt) {
    if (clicavel) {
      var local = content.globalToLocal(evt.stageX + this.offset.x, evt.stageY + this.offset.y);
      this.x = local.x;
      this.y = local.y;
    }
  });
  pecas_Co.on("pressup", function (evt) {
    if (clicavel) {
      for (var i = 0; i < contenthit.numChildren; i++) {
        var child = contenthit.getChildAt(i);
      }
      for (var i = 0; i < contenthit.numChildren; i++) {
        var child = contenthit.getChildAt(i);
        let colisao = ndgmr.checkPixelCollision(this, child, 0.1, true);
        if (colisao) {
          if (this.name == child.name) {
            clicavel = false;
            createjs.Tween.get(this).to({ x: child.x, y: child.y }, 200, createjs.Ease.backOut);
            setTimeout(() => {
              confere();
              clicavel = true;
            }, 300);
            break;
          }
        }
      }
      if (this.rotacionavel) {
        setTimeout(() => {
          criaHelpers(objSelect);
        }, 250);
      }
    }
  });
}
function limpaHelpers() {
  contentHelp.removeAllChildren();
}
function criaHelpers(qual) {
  var ponto = new createjs.Bitmap(caminho + "ponto.png");
  ponto.image.onload = function () { };
  contentHelp.addChild(ponto);
  ponto.regX = 23 / 2;
  ponto.regY = 23 / 2;

  var btGira = new createjs.Bitmap(caminho + "btGira.png");
  btGira.image.onload = function () { };
  contentHelp.addChild(btGira);
  btGira.x = 0;
  btGira.y = -120;
  btGira.regX = 56 / 2;
  btGira.regY = 56 / 2;
  btGira.on("click", function () {
    objSelect.rotation += itens[fase].rotacoes;

    if (objSelect.rotation >= 360) {
      objSelect.rotation = 0;
    }
    createjs.Tween.get(contentHelp, { override: true }).wait(3000).call(limpaHelpers);
    setTimeout(() => {
      confere();
      clicavel = true;
    }, 300);
  });
  contentHelp.x = objSelect.x;
  contentHelp.y = objSelect.y;
  createjs.Tween.get(contentHelp, { override: true }).wait(3000).call(limpaHelpers);

}
function shuffle(a) {
  var j, x, i;
  for (i = a.length; i; i -= 1) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
}
function ticker(event) {
  if (update) {
    stage.update();

  }
}
function intersect(obj1, obj2) {
  var objBounds1 = obj1.getBounds().clone();
  var objBounds2 = obj2.getBounds().clone();
  if (obj1.x > (obj2.x - edgeOffset) && obj1.x < (obj2.x + objBounds2.width + edgeOffset) && obj1.y > (obj2.y - edgeOffset) && obj1.y < (obj2.y + objBounds2.height + edgeOffset)) {
    return true;
  } else {
    return false;
  }
}

function _deb(_obj) {
  let esc = _obj.scaleX;
  let alp = _obj.alpha;
  _obj.on("mousedown", function (evt) {
    var global = content.localToGlobal(_obj.x, _obj.y);
    _obj.offset = { 'x': global.x - evt.stageX, 'y': global.y - evt.stageY };
    _obj.scaleX = _obj.scaleY = 0.75;
    _obj.alpha = 1;
  });
  _obj.on("pressmove", function (evt) {
    var local = content.globalToLocal(evt.stageX + _obj.offset.x, evt.stageY + _obj.offset.y);
    _obj.x = local.x;
    _obj.y = local.y;
  });
  _obj.on("pressup", function (evt) {
    console.log(_obj.x, _obj.y);
    _obj.scaleX = _obj.scaleY = esc;
    _obj.scaleX = _obj.scaleY = esc;
    _obj.alpha = alp;
  });
}

//CREDITOS
$(".botaoCredito").on("click", function () {
  $(".tela-creditos").toggleClass("is-hidden");
  var divcredito = document.querySelector("#creditos");
  divcredito.classList.add("blurdiv");
  document.querySelector("#iframeCredito").src =
    "../../CREDITOS/creditos_iframe.html";
});
$(".fechar-creditos").on("click", function () {
  $(".tela-creditos").toggleClass("is-hidden");
  window.parent.document.querySelector("#iframeCredito").src = "";
  console.log('click')
});
//CREDITOS
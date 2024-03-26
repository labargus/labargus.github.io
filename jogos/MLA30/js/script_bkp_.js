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
});

var bgColorArray = ["img01", "img02", "img03"],
 selectBG = bgColorArray[Math.floor(Math.random() * bgColorArray.length)];

$(".imagens").addClass(selectBG);
//CREDITOS

function escondeTelaInicial() {
 // Seleciona a div com a classe "telaInicial" e adiciona a classe "hidden" para ocultá-la novamente
 document.querySelector('.telaInicial').classList.add('hidden');
 console.log("Tela inicial escondida.");
 mostraTelaInteratividade();
 
}

function mostraTelaInteratividade() {
 // Seleciona a div com a classe "telaInteratividade" e remove a classe "hidden" para mostrá-la
 document.querySelector('.telaInteratividade').classList.remove('hidden');
 console.log("Tela de interatividade mostrada.");
 
}



//CANVAS
document.addEventListener("DOMContentLoaded", function () {
 var canvas = document.getElementById('myCanvas');
 var ctx = canvas.getContext('2d');

 var hexagon = {
     centerX: 110,
     centerY: 110,
     size: 100,
     isDragging: false,
     offsetX: 0,
     offsetY: 0
 };

 var triangle = {
     centerX: 250,
     centerY: 250,
     size: 100, // Removi o tamanho aqui
     isDragging: false,
     offsetX: 0,
     offsetY: 0
 };

 function drawHexagon(centerX, centerY) {
     var vertices = [];
     for (var i = 0; i < 6; i++) {
         var angle = (i * 2 * Math.PI) / 6;
         var x = centerX + hexagon.size * Math.cos(angle);
         var y = centerY + hexagon.size * Math.sin(angle);
         vertices.push({ x: x, y: y });
     }

     ctx.beginPath();
     ctx.moveTo(vertices[0].x, vertices[0].y);
     for (var i = 1; i < vertices.length; i++) {
         ctx.lineTo(vertices[i].x, vertices[i].y);
     }
     ctx.closePath();
     ctx.fillStyle = '#f86860';
     ctx.fill();
 }

 function drawEquilateralTriangle(centerX, centerY, size) {
     var height = (Math.sqrt(3) / 2) * size;

     ctx.beginPath();
     ctx.moveTo(centerX, centerY - height / 2);
     ctx.lineTo(centerX + size / 2, centerY + height / 2);
     ctx.lineTo(centerX - size / 2, centerY + height / 2);
     ctx.closePath();
     ctx.fillStyle = '#26a86d';
     ctx.fill();
 }

 function isMouseOverHexagon(mouseX, mouseY) {
     return (
         mouseX > hexagon.centerX - hexagon.size &&
         mouseX < hexagon.centerX + hexagon.size &&
         mouseY > hexagon.centerY - hexagon.size &&
         mouseY < hexagon.centerY + hexagon.size
     );
 }

 function isMouseOverTriangle(mouseX, mouseY) {
     return (
         mouseX > triangle.centerX - triangle.size / 2 &&
         mouseX < triangle.centerX + triangle.size / 2 &&
         mouseY > triangle.centerY - triangle.size / 2 &&
         mouseY < triangle.centerY + triangle.size / 2
     );
 }

 canvas.addEventListener('mousedown', function (event) {
     var mouseX = event.offsetX;
     var mouseY = event.offsetY;

     if (isMouseOverHexagon(mouseX, mouseY)) {
         hexagon.isDragging = true;
         hexagon.offsetX = mouseX - hexagon.centerX;
         hexagon.offsetY = mouseY - hexagon.centerY;
     }

     if (isMouseOverTriangle(mouseX, mouseY)) {
         triangle.isDragging = true;
         triangle.offsetX = mouseX - triangle.centerX;
         triangle.offsetY = mouseY - triangle.centerY;
     }
 });

 canvas.addEventListener('mouseup', function () {
     hexagon.isDragging = false;
     triangle.isDragging = false;
 });

 canvas.addEventListener('mousemove', function (event) {
     var mouseX = event.offsetX;
     var mouseY = event.offsetY;

     if (hexagon.isDragging) {
         hexagon.centerX = mouseX - hexagon.offsetX;
         hexagon.centerY = mouseY - hexagon.offsetY;
         ctx.clearRect(0, 0, canvas.width, canvas.height);
         drawHexagon(hexagon.centerX, hexagon.centerY);
         drawEquilateralTriangle(triangle.centerX, triangle.centerY, triangle.size); // Desenha o triângulo equilátero
     }

     if (triangle.isDragging) {
         triangle.centerX = mouseX - triangle.offsetX;
         triangle.centerY = mouseY - triangle.offsetY;
         ctx.clearRect(0, 0, canvas.width, canvas.height);
         drawHexagon(hexagon.centerX, hexagon.centerY);
         drawEquilateralTriangle(triangle.centerX, triangle.centerY, triangle.size); // Desenha o triângulo equilátero
     }
 });

 drawHexagon(hexagon.centerX, hexagon.centerY);
 drawEquilateralTriangle(triangle.centerX, triangle.centerY, triangle.size); // Desenha o triângulo equilátero
});

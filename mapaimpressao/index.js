const pageNumberInput = document.getElementById('pageNumber');
const pagesContainer = document.getElementById('pagesContainer');
const nCadernos = document.getElementById('nCadernos');
const exportBtn = document.getElementById('exportBtn');
const caixaCaderno = document.querySelector('.caixaCaderno');
const popModal = document.querySelector('.popModal');
const checkmark = document.querySelector('.checkmark');
var loadScreen = document.querySelector('#loaderSc');
var divSelected;
var body = document.body,
    html = document.documentElement;

var height = Math.max(body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight);
var width = Math.max(body.scrollWidth, body.offsetWidth,
    html.clientWidth, html.scrollWidth, html.offsetWidth);

console.log(loadScreen);

//const doc = new jsPDF();
var levelZoom = 150;
var nPag = 4;
if(document.getElementById('inputQuantCadernos').checked){
    nPag=8;
}else{
    nPag=4;
}

var visualizacao = "caderno";//caderno ou pagina
if(document.getElementById('inputVisualizacao').checked){
    visualizacao="pagina";
}else{
    visualizacao="caderno";
}

const itens = [
    {
        nome: "Folha de rosto",
        sigla: "FR",
        pagina: 1
    },
    {
        nome: "Ficha catalográfica",
        sigla: "FC",
        pagina: 2
    }
]

for (let i = 0; i < 1000; i++) {
    const element = {nome:i+3,sigla:i+3,pagina:i+3};
    itens.push(element);
}
console.log(itens)



pageNumberInput.addEventListener('input', () => {
    if(pageNumberInput.value<1000){
        criaPaginas();
    }else{
    alert("numero maximo de paginas deve ser 1000");

    }
    
});
function mudaModoVisualizacao(evt){
    console.log(evt.target.checked);
    if(evt.target.checked){
        visualizacao="pagina";
    }else{
        visualizacao="caderno";
    }
    criaPaginas();
}
function mudaModoQuantCaderno(evt){
    console.log(evt.target.checked);
    if(evt.target.checked){
        nPag=8;
    }else{
        nPag=4;
    }
    criaPaginas();
}

function criaPaginas() {
    const numPages = pageNumberInput.value;
    pagesContainer.innerHTML = '';

    const totalPages = Math.ceil(numPages / nPag);

    for (let i = 1; i <= totalPages; i++) {
        let pageGroup = document.createElement('div');
        pageGroup.classList.add('caderno');

        for (let j = 1; j <= nPag; j++) {
            const pageIndex = (i - 1) * nPag + j;

            if (numPages < pageIndex) {
                console.log("pagina vermelha");
                pageGroup.classList.add('cadVermelho');
            }else{
                pageGroup.classList.add('cadBranco');
            }
            if (pageIndex <= numPages) {
                let pageDiv = document.createElement('div');
                pageDiv.classList.add('pagina');
                let molinhazz = document.createElement('div');
                pageDiv.appendChild(molinhazz);
                molinhazz.classList.add('pagina-after');

                let span = document.createElement('span');
                span.classList.add('page-number');
                span.style.pointerEvents = 'none';
                //span.innerHTML = procuraPagina(pageIndex);
                span.innerHTML =itens[pageIndex-1].nome;
                pageDiv.appendChild(span);


                let molinhazz2 = document.createElement('div');
                pageDiv.appendChild(molinhazz2);
                molinhazz2.classList.add('pagina-before');
                
                if (nPag == 8) {
                    pageDiv.style.height = '32px';

                }

                //pageDiv.innerHTML = `<span class="page-number" style="pointer-events:none">${procuraPagina(pageIndex)}</span>`;
                if (visualizacao == "caderno") {
                    pageGroup.appendChild(pageDiv);
                } else {
                    pagesContainer.appendChild(pageDiv);
                }

                pageDiv.addEventListener('click', (evt) => {
                    console.log(evt.target);
                    divSelected = evt.target;
                    popModal.classList.remove("hidden");
                    if (evt.pageY > height - 500) {
                        popModal.style.top = height - 500 + "px";
                    } else {
                        popModal.style.top = evt.pageY + "px";
                    }

                    if (evt.pageX > width - 500) {
                        popModal.style.left = width - 500 + "px";
                    } else {
                        popModal.style.left = evt.pageX + "px";
                    }


                });
            }
        }
        if (visualizacao == "caderno") {
            pagesContainer.appendChild(pageGroup);
        }

    }
    let nCad = numPages / nPag
    //nCadernos.innerHTML = nCad;
    anime({
        targets: nCadernos,
        innerHTML: [nCadernos.innerHTML, nCad],
        easing: 'easeOutQuad',
        duration: 500,
        round: 10 // Will round the animated value to 1 decimal
    });

    if (isInt(nCad)) {

        caixaCaderno.classList.remove("caixaDanger")
        checkmark.classList.remove("hidden");
    } else {
        caixaCaderno.classList.add("caixaDanger");
        checkmark.classList.add("hidden");
        anime({
            targets: caixaCaderno,
            scale: [1.25, 1]
        });
    }

    zoomTotal();

    height = Math.max(body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight);
    width = Math.max(body.scrollWidth, body.offsetWidth,
        html.clientWidth, html.scrollWidth, html.offsetWidth);

    console.log(height, width);
}
exportBtn.addEventListener('click', () => {
    html2canvas(pagesContainer, {
        onrendered: function (canvas) {
            const imgData = canvas.toDataURL('image/png');
            const img = new Image();
            img.src = imgData;
            console.log("reder ok")

            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'paginas.png';
            link.click();
            //const pdf = new jsPDF();
            //pdf.addImage(img, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
            //pdf.save('paginas.png');
        }
    });
});
function fechaModal() {
    popModal.classList.add("hidden");
}
function mudaCor(evt) {
    console.log(evt.value);
    divSelected.style.backgroundColor = evt.value;
    popModal.classList.add("hidden");
}
function zoomin() {
    if (levelZoom < 300) {
        levelZoom += 25;
    }
    loadScreen.style.display="flex";
    zoomTotal();
    
}
function zoomout() {
    if (levelZoom > 100) {
        levelZoom -= 25;
    }
    loadScreen.style.display="flex";
    zoomTotal()
}
function zoomTotal() {
    var elements = document.querySelectorAll('.caderno');
    var elementsPag = document.querySelectorAll('.pagina');
    if (visualizacao == "caderno") {
        pagesContainer.setAttribute('style', 'display:grid;grid-template-columns: repeat(auto-fill, minmax(' + levelZoom + 'px,1fr))');
    } else {
        pagesContainer.setAttribute('style', 'display:flex;flex-wrap:wrap;grid-gap:0px');
    }

    for (var i = 0; i < elements.length; i++) {
        if (visualizacao == "caderno") {
            if (nPag == 8) {
                elements[i].setAttribute('style', 'display:flex;height:' + (levelZoom + 100) + 'px;');
            } else {
                elements[i].setAttribute('style', 'display:flex;height:' + levelZoom + 'px;');
            }
        } else {
            elements[i].setAttribute('style', 'height:' + levelZoom * 1.5 + 'px;width:' + levelZoom + 'px;');
        }
    }

    for (var i = 0; i < elementsPag.length; i++) {
        let pagafter=elementsPag[i].querySelector('.pagina-after');
        let pagbefore=elementsPag[i].querySelector('.pagina-before');
        pagbefore.style.display='none';
        if (visualizacao == "caderno") {
            pagafter.style.display='none';
            if (nPag == 8) {
                elementsPag[i].setAttribute('style', 'width:calc(50% - 10px);height:22%');
            } else {
                elementsPag[i].setAttribute('style', 'width:calc(50% - 10px);height:45%');
            }
        } else {
            
            elementsPag[i].setAttribute('style', 'width:' + levelZoom / 1.5 + 'px;height:' + levelZoom + 'px;margin-top:20px');
            var estilomola = document.createElement("style");
            if ((i + 1) % 2 === 0) {
                elementsPag[i].style.marginLeft = "10px";
                pagafter.style.display='block';
                //elementsPag[i].classList.add("pagina-after");
                //estilomola.innerHTML = ".pagina::after {content: '';position: absolute;right: 0;width: 10px; height: 100%;background-image: repeating-linear-gradient(0deg, transparent, transparent 9px, #ccc 9px, #ccc 10px);clip-path: polygon(100% 0, 0 0, 0 100%, 100% 100%);} ";   
            }else{
                pagafter.style.display='none';
                elementsPag[i].style.marginLeft = "0px";
                if(i>1){
                    pagbefore.style.display='block';
                }
               // estilomola.innerHTML = ".pagina::after {content: '';position: absolute;right: 0;width: 10px; height: 100%;background-image: repeating-linear-gradient(0deg, transparent, transparent 9px, #ccc 9px, #ccc 10px);clip-path: polygon(0 0, 0 0, 0 0, 0 0);} "; 
            }

            elementsPag[i].appendChild(estilomola);
        }

    }
    loadScreen.style.display="none";
}
function procuraPagina(_pag) {
    let retorna = _pag;
    itens.forEach(element => {
        if (element.pagina == _pag) {
            if (levelZoom > 150) {
                retorna = element.nome;
            } else {
                retorna = element.sigla;
            }

        }
    });
    return retorna;
}
function isInt(value) {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10));
}

criaPaginas();



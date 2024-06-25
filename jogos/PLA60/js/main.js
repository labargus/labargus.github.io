;(function(global){

    var srcImage;
    var fundoSet = false;
    var onomatopeiaSet = false;
    var baloesSet = false;
    var personagemSet = false;
    var objetoSet = false;
    var canvasCleared = false;
    var voltar = false;
    var z =1;
    var div;
    var boxNumber;
    var canvas = [];
    var canvasHistory = [];
    var fontSize;
    
    function MainGame() 
    {
            
        $("#slider1, #slider2, .boxFilho").hide();     

        $('#navtoHome, #comoFunciona, #buttonEnableAudio, #navToPrev, #navToNext').hide();       
        
        $("#footer").prepend("<a href=\"#\" id=\"back\" class=\"buttons\">Voltar</a>");
        $("#footer").append("<a href=\"#\" id=\"readHistory\" class=\"buttons\">Ler história</a>");
        $("#footer").append("<a href=\"#\" id=\"clear\" class=\"buttons\">Limpar</a>");
        DragAndDrop();

        insertCanvasId();

        //Ao clicar numa tirinha, inicia a parte de edição
        $(document).on('click', '#intro .box', function(){
        	App.Questions.execute(2);

            $("#intro .box").removeClass('selected');
            $(this).addClass('selected');
            var clone = $("#intro .boxes").clone(); 
            clone.children().empty();
            $("#editor #quadrados").append(clone);
            boxNumber = this.getAttribute("data-box");
            div = ".child_"+ boxNumber;
            $(".child_"+ boxNumber).show();
            canvasCleared = false;

            voltar = false;
        });


        $(document).on('click', '.btnsEditor button', function(){
            $("#slider2").hide();    
        });

        
        
        //Adiciona uma tirinha
        $(document).on('click', '.addScene', function(){
            var numeroQuadradoAdicional = $('#intro .boxes .box').length;
            

            
                if( $("#intro .boxes").children().length<4){
                    $("#intro .boxes").append('<div class="box" data-box="'+numeroQuadradoAdicional+'"></div>');
                    $("#intro .historia").append('<div class="box" data-box="'+numeroQuadradoAdicional+'"></div>');
                      
                }
                else if( $("#intro .boxes").children().length>=4){
                    Game.alert("Atenção! Uma tirinha pode conter de dois a quatro quadrinhos.", {
                        "OK": function(){}
                    })    
                }
                CheckBoxes();         
                insertCanvasId();

            verificaQuadrados(numeroQuadradoAdicional);
        });

        //Remove uma tirinha
        $(document).on('click', '.subScene', function(){
            var numeroQuadradoAdicional = $('#intro .boxes .box').length;
            
            if($("#intro .boxes").children().length>2){
                $("#intro .boxes div").last().remove();
                $("#intro .historia div").last().remove();
                
            }
            else if( $("#intro .boxes").children().length<=2){
                Game.alert("Atenção! Uma tirinha pode conter de dois a quatro quadrinhos.", {
                    "OK": function(){}
                })    
            }
            CheckBoxes();        
            verificaQuadrados(numeroQuadradoAdicional);
        });

        function voltarInicio(){
                App.Questions.execute(1);
                $("#intro .selected div").remove();
                $("#editor #quadrados .boxes").remove();  
                $(".scenes .boxFilho span").attr('contenteditable', 'false');  
                gerarMiniatura(div);
                $(".boxFilho").hide();
                setTimeout(function(){
                    $(".boxFilho img").removeClass('.imgSelected');
                });

                voltar = true;
        }        

       
        function lerHistoria(){
            
            var cloned = $(div).clone();
            var clone2 = $("#intro .boxes").clone();
            $(".scenes .historia").empty();
            $(".scenes .historia").append(clone2);               
           
            
            //div que receberá a miniatura da historinha.
            var target = $("#historia .box.selected");                                
            
                
                setTimeout(function(){
                    var quantidadeQuadrados = verificaQuadrados();
                    verificaQuadrados();
                    
                    cloned = cloned.attr("src", cloned);
                    target.empty();
                    target.append( $( cloned.get(0).outerHTML.replace(/child_[0-9]+/g)  ) );
                    cloned.show();
                     App.Questions.execute(3);
                },20);

           verificaQuadrados();
        }

        //botão ler historia
        $(document).on('click', '#readHistory', function(){
            lerHistoria();

        });

        //Botão voltar
        $(document).on('click', '#back', function(){
            voltarInicio();
        });

        //Deletar Imagens da tirinha
        $(document).on('click', '#clear', function(){
            Game.alert("Deseja apagar o desenho desse quadrinho?", {
                "Sim": function(){ 
                    $(div).empty();
                    $(div).css("background", "");
                    $(div).attr("data-background", "");
                    setCanvas();
                    canvasCleared = true;
                },
                "Não" : function(){
                
                }
             });
        });

         //Mostrar popUp opções de Background
        $(document).on("click", ".addBackground", function(){
            $("#slider1 .overview").empty();
            $('.setBackground').addClass('ativo');
            $("#slider1").show();
            for (var i = 1; i <= 5; i++) {
                $("#slider1 .overview").append("<li><img class='background objectFolder"+i+"'  src='images/fundos/fundos"+ i + "/objeto1.jpg' data-img='fundos/fundos"+i+"'/></li>");
            }
            
            $("#slider1").tinycarousel({
                 axis: "y",
            });
            var slider1 = $("#slider1").data("plugin_tinycarousel");
            slider1.update();
            slider1.move(0);
            fundoSet = true;
            onomatopeiaSet=false;
            baloesSet = false;
            personagemSet = false;
            objetoSet = false;
        });


        //Mostrar popUp opções de Personagens
        $(document).on("click", ".addPersonages", function(){
            $("#slider1 .overview").empty();
            $('.btnPersonages').addClass('ativo');
            $("#slider1").show();

            for (var i = 1; i < 30; i++) {
                $("#slider1 .overview").append("<li><img class='personagens objectFolder"+i+"' style='height: 58px; width:58px' src='images/personagens/personagem"+ i + "/objeto1.png' data-img='personagens/personagem"+i+"'/></li>");
            }
            $("#slider1 .prev, #slider1 .next").show();

            $("#slider1").tinycarousel({
                 axis: "y",
                 animationTime: 300,
            });
            var slider1 = $("#slider1").data("plugin_tinycarousel");
            slider1.update();
            slider1.move(0);
            fundoSet = false;
            onomatopeiaSet=false;
            personagemSet = true;
            baloesSet = false;
            objetoSet = false;
        });

        //Mostrar popUp opções de Onomatopeias
        $(document).on("click", ".addOnomatopeias", function(){
            $("#slider1 .overview").empty();
            $("#slider1").show();

            for (var i = 2; i <= 51; i++) {
                $("#slider1 .overview").append("<li><img class='onomatopeias objectFolder"+i+"' style='height: 58px; width:58px' src='images/onomatopeias/Objeto"+ i + ".png' data-img='onomatopeias' data-src='images/onomatopeias/Objeto"+ i + ".png'/></li>");
            }
            $("#slider1 .prev, #slider1 .next").show();

            $("#slider1").tinycarousel({
                 axis: "y",
                 animationTime: 300,
            });
            var slider1 = $("#slider1").data("plugin_tinycarousel");
            slider1.update();
            slider1.move(0);
            fundoSet = false;
            onomatopeiaSet=true;
            baloesSet = false;
            personagemSet = false;
            objetoSet = false;
        });


        //Mostrar popUp opções de Balões
        $(document).on("click", ".addBallons", function(){
            $("#slider1 .overview").empty();
            $("#slider1").show();

            for (var i = 1; i <= 9; i++) {
                $("#slider1 .overview").append("<li><img class='baloes objectFolder"+i+"' style='height: 58px; width:58px' src='images/baloes/objeto"+ i + ".png' data-img='baloes' data-src='images/baloes/objeto"+ i + ".png'/></li>");
            }
            $("#slider1 .prev, #slider1 .next").show();

            $("#slider1").tinycarousel({
                 axis: "y",
                 animationTime: 300,
            });
            var slider1 = $("#slider1").data("plugin_tinycarousel");
            slider1.update();
            slider1.move(0);
            fundoSet = false;
            onomatopeiaSet=false;
            baloesSet = true;
            personagemSet = false;
            objetoSet = false;
        });


        //Mostrar popUp opções de Objetos
        $(document).on("click", ".addObjects", function(){
            $("#slider1 .overview").empty();
            $("#slider1").show();

            for (var i = 1; i < 10; i++) {
                $("#slider1 .overview").append("<li><img class='objetos objectFolder"+i+"' style='height: 58px; width:58px' src='images/objetos/objeto"+ i + "/Objeto1.png' data-img='objetos/objeto"+i+"'/></li>");
            }
            $("#slider1 .prev, #slider1 .next").show();
            
            $("#slider1").tinycarousel({
                 axis: "y",
                 animationTime: 300,
            });
            var slider1 = $("#slider1").data("plugin_tinycarousel");
            slider1.update();
            slider1.move(0);
            fundoSet = false;
            onomatopeiaSet=false;
            baloesSet = false;
            personagemSet = false;
            objetoSet = true;
        });

        // Escolhas dos elementos para Background do cenario
        $(document).on("click", "#slider1 li img", function(){

            $("#slider2 .overview").empty();
            $("#slider2").show();
            setFolderQuantity(this);
            var quantidade = parseInt(this.getAttribute("data-qnt"));

            if(quantidade <= 3){
                $("#slider2 .prev","#slider2 .next").hide()
            }
            srcImage = this.getAttribute("data-img");

            if(fundoSet){
                var quantidadeImagens = parseInt(this.getAttribute("data-qnt"));
                for (var i = 1; i <= quantidadeImagens; i++) {
                    $("#slider2 .overview").append("<li><img style='height: 82px; width:103px' src='images/"+ srcImage + "/objeto"+i+".jpg' data-src='images/"+ srcImage + "/objeto"+i+".jpg'/></li>");
                }

            }
            if(onomatopeiaSet){

                var sourceImg = this.getAttribute("data-src");
                $(div).append('<img src='+sourceImg+'  style="width: 120px; height: auto; top: 33%; left: 30%; z-index: '+z+'"  />');
                $(div+" img").last().attr('data-height', $(div+" img").last().height());
                
                $("#slider2").hide();
                DragAndDrop();

            }
            if(baloesSet){
                var spans = document.createElement("span");
                spans.style.backgroundImage = "url("+this.getAttribute("data-src")+")";
                spans.setAttribute("data-src", this.getAttribute("data-src"));
                spans.style.backgroundRepeat = "no-repeat";
                spans.style.backgroundSize = "100% auto";
                spans.style.width = "100px";
                spans.style.height = "100px";
                spans.style.top = "33%";
                spans.style.left = "30%";

                $(div).append(spans);
                $("#slider2").hide();
                DragAndDrop();
            }

            if (objetoSet){
                var quantidadeImagens = parseInt(this.getAttribute("data-qnt"));
                for (var i = 1; i <= quantidadeImagens; i++) {
                    var img = new Image();
                    img.src = 'images/'+ srcImage + '/objeto'+i+'.png';
                    img.setAttribute('data-src', 'images/'+ srcImage + '/objeto'+i+'.png');
                    img.setAttribute('class', 'objeto');
                    img.style.width = "60px";
                    
                    img.onerror = function(){
                        $(this).parent().remove();
                    }

                    var li = document.createElement('li');
                    li.appendChild(img);
                    $("#slider2 .overview").append(li);
                }

            }
            if(personagemSet){
                var quantidadeImagens = parseInt(this.getAttribute("data-qnt"));
                for (var i = 1; i <= quantidadeImagens; i++) {
                    var img = new Image();
                    img.src = 'images/'+ srcImage + '/objeto'+i+'.png';
                    img.setAttribute('data-src', 'images/'+ srcImage + '/objeto'+i+'.png');
                    img.style.height = "82px";
                    img.style.width = "103px";
                    
                    img.onerror = function(){
                        $(this).parent().remove();
                        $(".mirrored").remove();
                    }

                    var li = document.createElement('li');
                    li.appendChild(img);
                    $("#slider2 .overview").append(li);
                }

            }

            $("#slider2").tinycarousel({
                 animationTime: 300,
            });
            var slider2 = $("#slider2").data("plugin_tinycarousel");
            slider2.update();
            slider2.move(0);
        });


        // Escolhas dos elementos para Background do cenario
        $(document).on("click", "#slider2 li img", function(){
            
            var sourceImg = this.getAttribute("data-src");
            if(fundoSet){
                $(div).attr("data-background", sourceImg);
            }
            if(fundoSet){
                $(div).css("background", "url("+sourceImg+") no-repeat");
                $(div).css("background-size", "100% 100%");
            }
            if(objetoSet){
                $(div).append('<img src='+sourceImg+' style=" z-index: '+z+'; top: 25%; left: 33%; width: 80px; "/>');   
            }
            else{

                if(!fundoSet){
                    $(div).append('<img src='+sourceImg+' style=" z-index: '+z+'; top: 25%; left: 33%; width: 70px; "/>');
                }
                $(div+" img").last().attr('data-height', $(div+" img").last().height());
            }
            DragAndDrop();
            $("#slider2").hide();
        });


        //Mostrar quais itens a selecionar
        $(document).on("click", ".boxFilho img", function(){
            if($(this).hasClass('imgSelected')){
                $(this).removeClass("imgSelected");
            }else{
                $('.boxFilho img').removeClass("imgSelected");
                $(this).addClass("imgSelected");
            }
        });

        //Mostrar quais itens a selecionar
        $(document).on("click", ".boxFilho span", function(){
            if($(this).hasClass('imgSelected')){
                $(this).removeClass("imgSelected");
            }else{
                $('.boxFilho img').removeClass("imgSelected");
                $(this).addClass("imgSelected");
            }
        });

        //Inverter Horizontalmente
        $(document).on("click", ".btnHorizontal", function(){ 
            $(".imgSelected").toggleClass("flipH"); 
            console.log($(this));
        });

        //Inverter Verticalmente
        $(document).on("click", ".btnVertical", function(){ 
            $(".imgSelected").toggleClass("flipV");
            console.log($(this)); 
        });


        //Girar para esquerda e direita
        var contFlip = 0;
        $(document).on("click", ".btnGirarAnteHora", function(){
            contFlip-=10;
            $(".imgSelected").css("transform", "rotate("+(contFlip)+"deg)");
            $(".imgSelected").css("-moz-transform", "rotate("+(contFlip)+"deg)");
            $(".imgSelected").css("-webkit-transform", "rotate("+(contFlip)+"deg)");
        });

        $(document).on("click", ".btnGirarHorario", function(){
            contFlip+=10;
            $(".imgSelected").css("transform", "rotate("+(contFlip)+"deg)");
            $(".imgSelected").css("-moz-transform", "rotate("+(contFlip)+"deg)");
            $(".imgSelected").css("-webkit-transform", "rotate("+(contFlip)+"deg)");
        });

        //Aumenta o z-index da imagem selecionada
        $(document).on("click", ".btnSobrepor", function(){
            z++;
            $(".imgSelected").css("z-index", z);
        });

        //Amplia o tamanho da imagem selecionada
        $(document).on("click", ".btnAmpliar", function(){
            var imgWidth = parseInt(document.querySelector('.imgSelected').style.width);
            imgWidth += 3;
            $('.imgSelected').attr("data-height", $('.imgSelected').height());
            if((!baloesSet && !onomatopeiaSet) && imgWidth < 90){
                $(".imgSelected").css("width", imgWidth+"px");
            }
            if((baloesSet || onomatopeiaSet) && imgWidth < 110){
                $(".imgSelected").css("width", imgWidth+"px");
            }
        });
        //Reduz o tamanho da imagem selecionada
        $(document).on("click", ".btnReduzir", function(){
            var imgWidth = parseInt(document.querySelector('.imgSelected').style.width);
            imgWidth -= 3;
            $('.imgSelected').attr("data-height", $('.imgSelected').height());
            if(imgWidth > 45){
                $(".imgSelected").css("width", (imgWidth)+"px");
            }
        });

        $(document).on("click", ".btnExcluirImage", function(){
            $('.imgSelected').remove();
        })

        $(document).on("click", "#editor .boxFilho span", function(){
            this.setAttribute('contenteditable', 'true');
            this.focus();
        })                                                                           

        $(document).on("click", ".btnDiminuirFonte", function(){
            fontSize = parseInt($(".imgSelected").css('font-size'));
            fontSize -= 1;
            if(fontSize > 10){
                $(".imgSelected").css("font-size", fontSize+"px");
            }

        })

        $(document).on("click", ".btnAumentarFonte", function(){
            fontSize = parseInt($(".imgSelected").css('font-size'));
            fontSize += 1;
            if(fontSize < 20){
                $(".imgSelected").css("font-size", fontSize+"px");
            }
        })

        $.fn.hasAnyClass = function() {
            for (var i = 0; i < arguments.length; i++) {
                var classes = arguments[i].split(" ");
                for (var j = 0; j < classes.length; j++) {
                    if (this.hasClass(classes[j])) {
                        return true;
                    }
                }
            }
            return false;
        }

        function setFolderQuantity(image){
            if($(image).hasClass('objetos')){
                if($(image).hasClass("objectFolder1"))
                    image.setAttribute("data-qnt", "83");            

                if($(image).hasClass("objectFolder2"))
                    image.setAttribute("data-qnt", "77");            

                if($(image).hasClass("objectFolder3"))
                    image.setAttribute("data-qnt", "9");            

                if($(image).hasClass("objectFolder4"))
                    image.setAttribute("data-qnt", "15");
                
                if($(image).hasClass("objectFolder5"))
                    image.setAttribute("data-qnt", "48");
                
                if($(image).hasClass("objectFolder6"))
                    image.setAttribute("data-qnt", "19");
                  
                if($(image).hasClass("objectFolder7"))
                    image.setAttribute("data-qnt", "24");
                
                if($(image).hasClass("objectFolder8"))
                    image.setAttribute("data-qnt", "47");
                    
                if($(image).hasClass("objectFolder9"))
                    image.setAttribute("data-qnt", "5");
            }
            if($(image).hasClass("background")){                
                if($(image).hasClass("objectFolder1"))
                    image.setAttribute("data-qnt", "30");            

                if($(image).hasClass("objectFolder2"))
                    image.setAttribute("data-qnt", "8");            

                if($(image).hasClass("objectFolder3"))
                    image.setAttribute("data-qnt", "16");            

                if($(image).hasClass("objectFolder4"))
                    image.setAttribute("data-qnt", "13");
                
                if($(image).hasClass("objectFolder5"))
                    image.setAttribute("data-qnt", "8");
            }
            if($(image).hasClass("personagens")){ 

                image.setAttribute("data-qnt", "9");

                if($(image).hasAnyClass("objectFolder13 objectFolder14 objectFolder18")){
                    image.setAttribute("data-qnt", "8");            
                }
                if($(image).hasAnyClass("objectFolder25", "objectFolder28")){
                    image.setAttribute("data-qnt", "3");            
                }
                if($(image).hasAnyClass("objectFolder20", "objectFolder21")){
                    image.setAttribute("data-qnt", "7");            
                }
                if($(image).hasAnyClass("objectFolder19")){
                    image.setAttribute("data-qnt", "10");            
                }
                if($(image).hasAnyClass("objectFolder22")){
                    image.setAttribute("data-qnt", "11");            
                }
                if($(image).hasAnyClass("objectFolder24")){
                    image.setAttribute("data-qnt", "6");            
                }
                if($(image).hasAnyClass("objectFolder26 objectFolder23")){
                    image.setAttribute("data-qnt", "2");            
                }
                if($(image).hasClass("objectFolder27")){
                    image.setAttribute("data-qnt", "4");
                }
                if($(image).hasClass("objectFolder29")){
                    image.setAttribute("data-qnt", "5");
                }                   
                
            }
        }

        //Verifica quantidade de tirinhas e ajusta classe de acordo com a mesma
        function CheckBoxes(){
             var qtdBoxes = $("#intro .boxes").children().length;

             switch(qtdBoxes)
                {
                    case 2:
                    {   
                        $("#intro .boxes").children().css("height","350px");
                        $("#intro .boxes").children().css("width","350px");
                        $("#intro .boxes").children().css("margin","40px 10px");

                        $("#intro .historia").children().removeClass("four three six");
                        $("#intro .historia").children().addClass("six");    
                        $("#intro .historia").children().css("height","310px");

                    }
                    break;
                    
                    case 3:
                    {
                        $("#intro .boxes").children().css("height","225px"); 
                        $("#intro .boxes").children().css("width","225px");
                        $("#intro .boxes").children().css("margin","95px 10px"); 

                        $("#intro .historia").children().removeClass("four three six");
                        $("#intro .historia").children().addClass("four"); 
                        $("#intro .historia").children().css("height","225px"); 

                    }
                    break;

                    case 4:
                    { 
                        $("#intro .boxes").children().css("height","165px"); 
                        $("#intro .boxes").children().css("width","165px");
                        $("#intro .boxes").children().css("margin","95px 10px"); 

                        $("#intro .historia").children().removeClass("four three six");
                        $("#intro .historia").children().addClass("three");  
                        $("#intro .historia").children().css("height","180px"); 
                    }
                    break;
                }

        }


        function verificaQuadrados(){
            var quantidadeQuadrados = $('#intro .boxes .box').length;
            
             switch(quantidadeQuadrados){
                case 2:
                    setTimeout(function(){
                        $("#intro .box div, #historia .box div").css('-webkit-transform','scale(0.95, 0.95)');
                        $("#intro .box div, #historia .box div").css('-moz-transform','scale(0.95, 0.95)');
                        $("#intro .box div, #historia .box div, #historia .box div").css('-o-transform','scale(0.95, 0.95)');
                        $("#intro .box div, #historia .box div").css('transform','scale(0.95, 0.95)');
                        $("#intro .box div, #historia .box div").addClass('tipo2');                        
                        $("#intro .box div, #historia .box div").removeClass('tipo3');                        
                        $("#intro .box div, #historia .box div").removeClass('tipo4');                    
                    },5);
                break;
                case 3:
                    setTimeout(function(){
                        $("#intro .box div, #historia .box div").css('-webkit-transform','scale(0.61, 0.61)');                        
                        $("#intro .box div, #historia .box div").css('-moz-transform','scale(0.61, 0.61)');
                        $("#intro .box div, #historia .box div").css('-o-transform','scale(0.61, 0.61)');
                        $("#intro .box div, #historia .box div").css('transform','scale(0.61, 0.61)');                                            
                        $("#intro .box div, #historia .box div").addClass('tipo3');                                                
                        $("#intro .box div, #historia .box div").removeClass('tipo2');                        
                        $("#intro .box div, #historia .box div").removeClass('tipo4'); 
                    },5);
                break;
                case 4:                    
                    setTimeout(function(){                        
                        $("#intro .box div, #historia .box div").css('-webkit-transform','scale(0.44, 0.44)');                                                
                        $("#intro .box div, #historia .box div").css('-moz-transform','scale(0.44, 0.44)');
                        $("#intro .box div, #historia .box div").css('-o-transform','scale(0.44, 0.44)');
                        $("#intro .box div, #historia .box div").css('transform','scale(0.44, 0.44)');                                                           
                        $("#intro .box div, #historia .box div").addClass('tipo4');                                                
                        $("#intro .box div, #historia .box div").removeClass('tipo2');                        
                        $("#intro .box div, #historia .box div").removeClass('tipo3');                         
                    },5);
                break;
            }

            return quantidadeQuadrados;
        }

        //Converte imagens da div BoxFilho em canvas
        function gerarMiniatura(currentBox){
            //conteúdo clonado.
            var cloned = $(currentBox).clone();

            if(cloned.css('background-image')  || cloned.children().length >= 1) {
               
           
            
            //div que receberá a miniatura da historinha.
            var target = $("#intro .box.selected");                                
            
                
                setTimeout(function(){
                    var quantidadeQuadrados = verificaQuadrados();
                    verificaQuadrados();
                    
                    cloned = cloned.attr("src", cloned);
                    target.empty();
                    target.append( $( cloned.get(0).outerHTML.replace(/child_[0-9]+/g)  ) );
                    cloned.show();
                },20);
            }     
        }
          
        function getRotationDegrees(obj) {
           var matches = +/\d{1,3}/.exec($(obj)[0].style.transform);
           
           if (matches) {
               return matches[0];
           }
           
           return 0;
        }


        function wrapText(context, text, x, y, maxWidth, lineHeight) {
            var words = text.split(' ');
            var line = '';

            for(var n = 0; n < words.length; n++) {
              var testLine = line + words[n] + ' ';
              var metrics = context.measureText(testLine);
              var testWidth = metrics.width;
              if (testWidth > maxWidth && n > 0) {
                context.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
              }
              else {
                line = testLine;
              }
            }
            context.fillText(line, x, y);
        }

        //Cria contexto do Canvas
        function setCanvas(){
            var indexCanvas = $(".row.boxes div").length;
            canvas = [];
            canvasHistory = [];

            for(var i=0; i<indexCanvas; i++){
                canvas.push(document.querySelector("#cvs_"+i).getContext("2d"));
                canvasHistory.push(document.querySelector("#historia_"+i).getContext("2d"));

            }
        }

        //Insere Id do canvas
        function insertCanvasId(){
            $(".row.boxes canvas").each(function(index){
                $(this).attr("id", "cvs_"+index);
            })

            $(".row.historia canvas").each(function(index){
                $(this).attr("id", "historia_"+index);
            })
        }

        //Função do Drag and Drop
        function DragAndDrop(){

            $(div+" img").draggable({
                containment: div
            });

            $(div+" span").draggable({
                containment: div,
                start: function(e, ui){
                   
                }
            });


            $(div).droppable({
            });
        }
    }

            

    global.MainGame = MainGame;



}(this));
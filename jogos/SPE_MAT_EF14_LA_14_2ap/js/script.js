$(document).ready(function () {
  // Variáveis globais para armazenar os valores

  const cube = $('#cube');
  const resultadoDado = $('#resultadoDado');
  var numStars = 0;
  var isUserPlaying = true;





  $('.creditos').on('click', function () {
    $('.tela-creditos').toggleClass('is-hidden');
    var divcredito = document.querySelector("#creditos");
    divcredito.classList.add("blurdiv");
    document.querySelector("#iframeCredito").src = "../../CREDITOS/creditos_iframe.html";
  });

  $('.fechar-creditos').on('click', function () {
    $('.tela-creditos').toggleClass('is-hidden');
    window.parent.document.querySelector("#iframeCredito").src = "";
  });


  $(window).on('resize', function () {
    var height = window.innerHeight;
    var width = window.innerWidth;

    if (height <= 616 && width <= 767 && height < width) {
      $('.tela.rotate').removeClass('is-hidden');

    }
    else if (height > width) {
      $('.tela.rotate').addClass('is-hidden');
    }
    else if (height <= 1024 && width >= 768) {
      $('.tela.rotate').addClass('is-hidden');
    }
  }).trigger('resize');



  $('#btn_inicio').on('click', function () {
    $(this).closest('.tela-inicio').addClass('is-hidden').next().removeClass('is-hidden');

    if (document.documentElement.requestFullscreen) {
      // document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari e Opera
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
      document.documentElement.msRequestFullscreen();
    }
  });

  $('#btn-apresentacao').on('click', function () {
    var nomeparticipante = document.querySelector("#nome-participante").value;
    if (nomeparticipante.trim() === "") {
      return;
    } else {
      $(this).closest('.tela-apresentacao').addClass('is-hidden');
      $('#secao-jogo-1').removeClass('is-hidden');
      $('#modal-instrucao-1').show();
    }
  });

  //NOME PARTICIPANTE

  $('#nome-participante').keyup(function () {
    var textoDigitado = $(this).val();
    $('.jogador').text(textoDigitado);
  });


  // MODAL BTN

  $('#btn-modal-01').click(function () {
    $('#modal-instrucao-1').hide();
    $('#modal-instrucao-2').show();
  });

  $('#btn-modal-02').click(function () {
    $('#modal-instrucao-2').hide();
    $('#modal-instrucao-3').show();
  });

  $('#btn-modal-03').click(function () {
    $('#modal-instrucao-3').hide();
    $('#modal-instrucao-4').show();
  });

  $('#btn-modal-04').click(function () {
    $('#modal-instrucao-4').hide();
    $('#modal-instrucao-5').show();
  });

  $('#btn-modal-05').click(function () {
    $('#modal-instrucao-5').hide();
    $('#secao-jogo-1').addClass('is-hidden');
    $('#secao-jogo-2').removeClass('is-hidden');
  });

  $('.btn-ajuda').click(function () {
    $('#secao-jogo-1').removeClass('is-hidden');
    $('#modal-instrucao-1').show();
  });


  //tinha duas funcoes .jogar unifiquei as duas
  $('.jogar').click(function (event) {
    //habilita cliques apaenas para o usuario
    if (isUserPlaying) {
      $('#modal-jogar-dado').show();
      //Aqui eu mando girar o Dado pois ele estava girando em falso ao abrir a div (no edge)
      roll(event);


      numStars = getRandomInt(1, 7); // Armazena a quantidade de estrelas
      var container = $('.estrela-rodadas');
      container.empty();

      for (var i = 0; i < numStars; i++) {
        var star = $('<div class="star"></div>');
        container.append(star);
      }
    }
  });


  //troquei o nome para btClose para nao conflitar com o botao de fechar o dado
  $('.bt-close').click(function (event) {
    //habilita cliques apaenas para o usuario
    if (isUserPlaying) {
      // $('#secao-jogo-1').removeClass('is-hidden');
      $('#modal-muito-bem').hide();
      $('#modal-numero-sorteado').hide();
      $('#modal-que-pena').hide();

      if ($(this).hasClass("correctOption")) {
        isUserPlaying = false;
        ComputerPlay(event);
      }
    }
  });

  $('#btn-modal-parabens').click(function () {
    //habilita cliques apaenas para o usuario
    if (isUserPlaying) {
      $('#modal-parabens').hide();
      $('#secao-jogo-3').addClass('is-hidden');
      $('#secao-jogo-2').removeClass('is-hidden');
      $('#nome-participante').val('');
    }
  });

  $('#btn-modal-errou').click(function () {
    //habilita cliques apaenas para o usuario
    if (isUserPlaying) {
      $('#modal-errou').hide();
      $('#secao-jogo-3').addClass('is-hidden');
      $('#secao-jogo-2').removeClass('is-hidden');
      $('#nome-participante').val('');
    }
  });


  $('.fechar-dado').click(function () {
    //habilita cliques apaenas para o usuario
    if (isUserPlaying) {
      $('#modal-jogar-dado').hide();
      $('#secao-jogo-2').addClass('is-hidden');
      $('#secao-jogo-3').removeClass('is-hidden');
    }
  });

  function ComputerPlay(event) {
    setTimeout(() => {
      console.log("inicia jogada do computador")
      $('#modal-jogar-dado').show();
      //Aqui eu mando girar o Dado pois ele estava girando em falso ao abrir a div (no edge)
      roll(event);


      numStars = getRandomInt(1, 7); // Armazena a quantidade de estrelas
      var container = $('.estrela-rodadas');
      container.empty();

      for (var i = 0; i < numStars; i++) {
        var star = $('<div class="star"></div>');
        container.append(star);
      }


      setTimeout(() => {
        console.log("espera 6s para fechar tela do dado");

        $('#modal-jogar-dado').hide();
        $('#secao-jogo-2').addClass('is-hidden');
        $('#secao-jogo-3').removeClass('is-hidden');

        

      }, 6000);


    }, 1000);
  }

  //QUANTIDADE ESTRELAS ALEATORIAMENTE



  function roll(event) {
    var n = Math.floor((Math.random() * 6) + 1);
    cube.removeClass(); // Remove todas as classes anteriores
    cube.addClass('show-d' + n); // Adiciona a classe para mostrar a face correta
    cube.css('animation', 'none'); // Remove qualquer animação existente para reiniciar a animação
    setTimeout(function () {
      cube.css('animation', ''); // Aplica a nova animação
    }, 10); // Pequeno delay para garantir que a animação seja reiniciada

    console.log('dice is: ' + n);

    setTimeout(() => {
      console.log('Terminou jogada do Dado, caso seja Computador passa pra');
    }, 4000);
  }

  //$("#cube figure p").click(roll);

  // Modificação na função de gerar estrelas


  // Adicionando estrelas na div grande se a condição for verdadeira
  $('#btn-pegar-03').click(function () {
    //habilita cliques apaenas para o usuario
    if (isUserPlaying) {
      function verificarFaceDado() {
        var faceUm = resultadoDado.find('img[alt="Face 1 do dado"]');
        var faceDois = resultadoDado.find('img[alt="Face 2 do dado"]');
        var faceTres = resultadoDado.find('img[alt="Face 3 do dado"]');
        var faceQuatro = resultadoDado.find('img[alt="Face 4 do dado"]');
        var faceCinco = resultadoDado.find('img[alt="Face 5 do dado"]');
        var faceSeis = resultadoDado.find('img[alt="Face 6 do dado"]');

        if (faceUm.length > 0 && numStars == 1) {
          console.log('A face 1 do dado está presente.');
          console.log('Entrou no if, numStars:', numStars);
          var containerGrande = $('.espaco-jogador');
          // containerGrande.empty();


          console.log('Preparando para entrar no loop for com numStars:', numStars);
          for (var i = 0; i < numStars; i++) {
            console.log('Adicionando estrela:', i + 1);
            var star = $('<div class="star"></div>');
            containerGrande.append(star); // Adiciona as estrelas na div grande
            setTimeout(function () {
              $("#modal-muito-bem").show();
            }, 200);
          }
          return true;
        } else if ((faceUm.length > 0 && numStars > 1)) {
          setTimeout(function () {
            $("#modal-numero-sorteado").show();
          }, 200);
        }

        if (faceDois.length > 0 && numStars <= 2) {
          console.log('A face 2 do dado está presente.');
          console.log('Entrou no if, numStars:', numStars);
          var containerGrande = $('.espaco-jogador');
          // containerGrande.empty();

          console.log('Preparando para entrar no loop for com numStars:', numStars);
          for (var i = 0; i < numStars; i++) {
            console.log('Adicionando estrela:', i + 1);
            var star = $('<div class="star"></div>');
            containerGrande.append(star); // Adiciona as estrelas na div grande
            setTimeout(function () {
              $("#modal-muito-bem").show();
            }, 200);
          }
          return true;
        } else if (faceDois.length > 0 && numStars > 2) {
          setTimeout(function () {
            $("#modal-numero-sorteado").show();
          }, 200);
        }

        if (faceTres.length > 0 && numStars <= 3) {
          console.log('A face 3 do dado está presente.');
          console.log('Entrou no if, numStars:', numStars);
          var containerGrande = $('.espaco-jogador');
          // containerGrande.empty();

          console.log('Preparando para entrar no loop for com numStars:', numStars);
          for (var i = 0; i < numStars; i++) {
            console.log('Adicionando estrela:', i + 1);
            var star = $('<div class="star"></div>');
            containerGrande.append(star); // Adiciona as estrelas na div grande
            setTimeout(function () {
              $("#modal-muito-bem").show();
            }, 200);
          }
          return true;
        } else if (faceTres.length > 0 && numStars > 3) {
          setTimeout(function () {
            $("#modal-numero-sorteado").show();
          }, 200);
        }

        if (faceQuatro.length > 0 && numStars <= 4) {
          console.log('A face 4 do dado está presente.');
          console.log('Entrou no if, numStars:', numStars);
          var containerGrande = $('.espaco-jogador');
          // containerGrande.empty();

          console.log('Preparando para entrar no loop for com numStars:', numStars);
          for (var i = 0; i < numStars; i++) {
            console.log('Adicionando estrela:', i + 1);
            var star = $('<div class="star"></div>');
            containerGrande.append(star); // Adiciona as estrelas na div grande
            setTimeout(function () {
              $("#modal-muito-bem").show();
            }, 200);
          }
          return true;
        } else if (faceQuatro.length > 0 && numStars > 4) {
          setTimeout(function () {
            $("#modal-numero-sorteado").show();
          }, 200);
        }

        if (faceCinco.length > 0 && numStars <= 5) {
          console.log('A face 5 do dado está presente.');
          console.log('Entrou no if, numStars:', numStars);
          var containerGrande = $('.espaco-jogador');
          // containerGrande.empty();


          console.log('Preparando para entrar no loop for com numStars:', numStars);
          for (var i = 0; i < numStars; i++) {
            console.log('Adicionando estrela:', i + 1);
            var star = $('<div class="star"></div>');
            containerGrande.append(star); // Adiciona as estrelas na div grande
            setTimeout(function () {
              $("#modal-muito-bem").show();
            }, 200);
          }

          return true;
        } else if (faceCinco.length > 0 && numStars > 5) {
          setTimeout(function () {
            $("#modal-numero-sorteado").show();
          }, 200);
        }

        if (faceSeis.length > 0 && numStars <= 6) {
          console.log('A face 6 do dado está presente.');
          console.log('Entrou no if, numStars:', numStars);
          var containerGrande = $('.espaco-jogador');
          // containerGrande.empty();

          console.log('Preparando para entrar no loop for com numStars:', numStars);
          for (var i = 0; i < numStars; i++) {
            console.log('Adicionando estrela:', i + 1);
            var star = $('<div class="star"></div>');
            containerGrande.append(star); // Adiciona as estrelas na div grande
            setTimeout(function () {
              $("#modal-muito-bem").show();
            }, 200);
          }
          return true;
        } else if (faceSeis.length > 0 && numStars > 6) {
          setTimeout(function () {
            $("#modal-numero-sorteado").show();
          }, 200);
        }
      }

      // Você pode chamar essa função quando necessário para verificar a condição
      verificarFaceDado();
    }
  });

  $('#btn-nao-pegar-03').click(function () {
    //habilita cliques apaenas para o usuario
    if (isUserPlaying) {
      function verificarFaceDado() {
        var faceUm = resultadoDado.find('img[alt="Face 1 do dado"]');
        var faceDois = resultadoDado.find('img[alt="Face 2 do dado"]');
        var faceTres = resultadoDado.find('img[alt="Face 3 do dado"]');
        var faceQuatro = resultadoDado.find('img[alt="Face 4 do dado"]');
        var faceCinco = resultadoDado.find('img[alt="Face 5 do dado"]');
        var faceSeis = resultadoDado.find('img[alt="Face 6 do dado"]');

        if (faceUm.length > 0 && numStars == 1) {
          setTimeout(function () {
            $("#modal-que-pena").show();
          }, 200);
        } else if ((faceUm.length > 0 && numStars > 1)) {
          setTimeout(function () {
            $("#modal-muito-bem").show();
          }, 200);
        }

        if (faceDois.length > 0 && numStars <= 2) {
          setTimeout(function () {
            $("#modal-que-pena").show();
          }, 200);
        } else if (faceDois.length > 0 && numStars > 2) {
          setTimeout(function () {
            $("#modal-muito-bem").show();
          }, 200);
        }

        if (faceTres.length > 0 && numStars <= 3) {
          setTimeout(function () {
            $("#modal-que-pena").show();
          }, 200);
        } else if (faceTres.length > 0 && numStars > 3) {
          setTimeout(function () {
            $("#modal-muito-bem").show();
          }, 200);
        }

        if (faceQuatro.length > 0 && numStars <= 4) {
          setTimeout(function () {
            $("#modal-que-pena").show();
          }, 200);
        } else if (faceQuatro.length > 0 && numStars > 4) {
          setTimeout(function () {
            $("#modal-muito-bem").show();
          }, 200);
        }

        if (faceCinco.length > 0 && numStars <= 5) {
          setTimeout(function () {
            $("#modal-que-pena").show();
          }, 200);
        } else if (faceCinco.length > 0 && numStars > 5) {
          setTimeout(function () {
            $("#modal-muito-bem").show();
          }, 200);
        }

        if (faceSeis.length > 0 && numStars <= 6) {
          setTimeout(function () {
            $("#modal-que-pena").show();
          }, 200);
        } else if (faceSeis.length > 0 && numStars > 6) {
          setTimeout(function () {
            $("#modal-muito-bem").show();
          }, 200);
        }
      }

      // Você pode chamar essa função quando necessário para verificar a condição
      verificarFaceDado();
    }
  });


  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  //JOGAR DADO
  // function roll(event) {
  //   var n = Math.floor((Math.random() * 6) + 1);
  //   var cube = $("#cube");
  //   cube.removeClass(); // Remove todas as classes anteriores
  //   cube.addClass('show-d' + n); // Adiciona a classe para mostrar a face correta
  //   cube.css('animation', 'none'); // Remove qualquer animação existente para reiniciar a animação
  //   setTimeout(function () {
  //     cube.css('animation', ''); // Aplica a nova animação
  //   }, 10); // Pequeno delay para garantir que a animação seja reiniciada

  //   console.log('dice is: ' + n);
  // }

  // // $("#rollbtn").click(roll);
  // $("#cube figure p").click(roll);




  function atualizarImagem() {
    if (cube.hasClass('show-d1')) {
      resultadoDado.html('<img class="img-jogar-dados" src="../assets/dado01.png" alt="Face 1 do dado">');
    } else if (cube.hasClass('show-d2')) {
      resultadoDado.html('<img class="img-jogar-dados" src="../assets/dado02.png" alt="Face 2 do dado">');
    } else if (cube.hasClass('show-d3')) {
      resultadoDado.html('<img class="img-jogar-dados" src="../assets/dado03.png" alt="Face 3 do dado">');
    } else if (cube.hasClass('show-d4')) {
      resultadoDado.html('<img class="img-jogar-dados" src="../assets/dado04.png" alt="Face 4 do dado">');
    } else if (cube.hasClass('show-d5')) {
      resultadoDado.html('<img class="img-jogar-dados" src="../assets/dado05.png" alt="Face 5 do dado">');
    } else if (cube.hasClass('show-d6')) {
      resultadoDado.html('<img class="img-jogar-dados" src="../assets/dado06.png" alt="Face 6 do dado">');
    }
    else {
      resultadoDado.empty(); // Limpa a div se não for a classe show-d1
    }
  }

  // Chame a função quando necessário, por exemplo, após uma animação ou evento
  // cube.on('transitionend', atualizarImagem);
  $('#fechar-dado-01').click(atualizarImagem);

  // Você também pode chamar a função diretamente se necessário
  atualizarImagem();



  var teste = "asd";
});














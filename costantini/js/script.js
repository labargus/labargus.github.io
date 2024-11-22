
/////////
document.addEventListener("DOMContentLoaded", function() {
  var menuBurguerTI = document.querySelector(".menuBurguerTI");
  var menuLateral = document.querySelector(".menuLateral");

  menuBurguerTI.addEventListener("click", function() {
    menuLateral.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    window.addEventListener("scroll", disableScroll);
    
    setTimeout(function() {
      menuLateral.classList.remove("fechado");
      menuLateral.classList.add("aberto");
    }, 100); 
  });

  function disableScroll() {
    window.scrollTo(0, 0);
  }

  // Seleciona todos os elementos com a classe 'fecharMenuT'
  var itensFecharMenu = document.querySelectorAll(".fecharMenuT");

  itensFecharMenu.forEach(function(item) {
    item.addEventListener("click", function() {
      
      document.body.style.overflow = "";
      window.removeEventListener("scroll", disableScroll);

      setTimeout(function() {
        menuLateral.classList.add("fechado");
      }, 100);

      menuLateral.classList.remove("aberto");
    });
  });

});
///////


//MENU
function showScreen(screenId) {
  // Esconde todas as telas
  const screens = document.querySelectorAll('.tela');
  screens.forEach(screen => {
      screen.classList.add('hidden');
  });

  // Mostra apenas a tela desejada
  const selectedScreen = document.getElementById(screenId);
  if (selectedScreen) {
      selectedScreen.classList.remove('hidden');
  }
  document.body.scrollTop = 0; // Para navegadores Chrome, Firefox, IE e Opera
  document.documentElement.scrollTop = 0; // Para o Safari
}
//MENU


//MODAL 18+
/*para testes sem incomodação
  document.addEventListener("DOMContentLoaded", function() {
  document.getElementById('caixaModal18').classList.add('hidden');
  document.getElementById('textoTituloMenuTI').classList.remove('hidden');
  document.getElementById('menuBurguerTI').classList.remove('hidden');
  document.getElementById('menuTrinario').classList.remove('hidden');
  document.getElementById('sobreNos').classList.remove('hidden');
  document.getElementById('footer').classList.remove('hidden');
});
*///para testes sem incomodação

function fechaModal18() {
  document.getElementById('caixaModal18').classList.add('hidden');
  document.getElementById('textoTituloMenuTI').classList.remove('hidden');
  document.getElementById('menuBurguerTI').classList.remove('hidden');
  document.getElementById('menuTrinario').classList.remove('hidden');
  document.getElementById('sobreNos').classList.remove('hidden');
  document.getElementById('footer').classList.remove('hidden');
}

function naoSouMaior() {
  document.getElementById('souMaior').classList.add('hidden');
  document.getElementById('naoSouMaior').classList.remove('hidden')
}
//MODAL 18+

// NOSSA HISTORIA
function nossaHistoria() {
  document.getElementById('tela2').classList.add('hidden');
  document.getElementById('tela8').classList.remove('hidden');
}

function nossaHistoriaTela1() {
  document.getElementById('nossaHistoriaTela01').classList.add('hidden');
  document.getElementById('nossaHistoriaTela02').classList.remove('hidden');
}

function nossaHistoriaTela2() {
  document.getElementById('nossaHistoriaTela02').classList.add('hidden');
  document.getElementById('nossaHistoriaTela03').classList.remove('hidden');
}

function nossaHistoriaTela3() {
  document.getElementById('nossaHistoriaTela03').classList.add('hidden');
  document.getElementById('nossaHistoriaTela02').classList.remove('hidden');
}

function nossaHistoriaTela4() {
  document.getElementById('nossaHistoriaTela02').classList.add('hidden');
  document.getElementById('nossaHistoriaTela01').classList.remove('hidden');
}


function nossaHistoriaTela1BT() {
  window.scrollTo(0, 500);
  document.getElementById('nossaHistoriaTela01').classList.add('hidden');
  document.getElementById('nossaHistoriaTela02').classList.remove('hidden');
}

function nossaHistoriaTela2BT() {
  window.scrollTo(0, 500);
  document.getElementById('nossaHistoriaTela02').classList.add('hidden');
  document.getElementById('nossaHistoriaTela03').classList.remove('hidden');
}
// NOSSA HISTORIA

// NOSSOS VINHOS
function nossoVinhoENIGMA() {
  document.getElementById('tela4').classList.add('hidden');
  document.getElementById('tela5').classList.remove('hidden');
  document.getElementById('vinhoENIGMA').classList.remove('hidden');
  window.scrollTo(0, 0);
}

function nossoVinhoDONCOSTANTINO() {
  document.getElementById('tela4').classList.add('hidden');
  document.getElementById('tela5').classList.remove('hidden');
  document.getElementById('vinhoDONCOSTANTINO').classList.remove('hidden');
  window.scrollTo(0, 0);
}

function nossaSidraAGELICASECO() {
  document.getElementById('tela4').classList.add('hidden');
  document.getElementById('tela5').classList.remove('hidden');
  document.getElementById('sidraAGELICASECO').classList.remove('hidden');
  window.scrollTo(0, 0);
}

function nossaSidraAGELICAmeioSECO() {
  document.getElementById('tela4').classList.add('hidden');
  document.getElementById('tela5').classList.remove('hidden');
  document.getElementById('sidraAGELICAmeioSECO').classList.remove('hidden');
  window.scrollTo(0, 0);
}
// NOSSOS VINHOS



// Função para rolar a página de volta ao topo
function voltarAoTopo() {
  document.body.scrollTop = 0; // Para navegadores Chrome, Firefox, IE e Opera
  document.documentElement.scrollTop = 0; // Para o Safari
}

// Mostrar ou ocultar o botão de voltar ao topo dependendo da posição da página
window.onscroll = function() {mostrarBotaoVoltarAoTopo()};
  
function mostrarBotaoVoltarAoTopo() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("voltar-ao-topo").style.display = "block";
  } else {
    document.getElementById("voltar-ao-topo").style.display = "none";
  }
}
// Função para rolar a página de volta ao topo


//vai para a loja
function abrirLoja() {
  window.location.href = "https://107902.dlojavirtual.com/"; 
}

function abrirLojaVinho1() {
  window.location.href = "https://107902.dlojavirtual.com/cabernet-sauvignon/vinho-cabernet-sauvignon"; 
}

function abrirLojaVinho2() {
  window.location.href = "https://107902.dlojavirtual.com/merlot/vinho-merlot"; 
}
//vai para a loja

//navegacao nossa historia
function mudaTexto(telaId) {
  // Esconde todas as telas
  const telas = document.querySelectorAll('.textoTela8');
  telas.forEach(tela => {
    tela.classList.add('hidden');
  });

  // Mostra apenas a tela desejada
  const selectedScreen = document.getElementById(telaId);
  if (selectedScreen) {
    selectedScreen.classList.remove('hidden');
  }
  
  scrollToDiv();
}

function scrollToDiv() {
  console.log('chamou')
  var element = document.getElementById("sobeAqui");
  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
///navegacao nossa historia

//navegacao nossa historia
function mudaNavCuidado(navCuidadoId) {
  // Esconde todas as telas
  const telas = document.querySelectorAll('.cuidadoRespeitohid');
  telas.forEach(tela => {
    tela.classList.add('hidden');
  });

  // Mostra apenas a tela desejada
  const selectedScreen = document.getElementById(navCuidadoId);
  if (selectedScreen) {
    selectedScreen.classList.remove('hidden');
  }
}
//navegacao nossa historia


/*conteudo exclusivo bkp
document.addEventListener('DOMContentLoaded', function() {
  var video = document.getElementById('videoBG');
  video.muted = true;
  video.play();

  // Verifica se o parâmetro 'mostrarTela7' está presente na URL
  var urlParams = new URLSearchParams(window.location.search);
  var mostrarTela7 = urlParams.get('mostrarTela7');
  var scrollFim = urlParams.get('scrollFim'); // Novo parâmetro para ir direto ao fim

  // Se o parâmetro 'mostrarTela7' existir, remove a classe 'hidden' do #tela7
  if (mostrarTela7 === 'true') {
    var tela7 = document.getElementById('tela7');
    if (tela7) {
      tela7.classList.remove('hidden');
    }

    // Aplica a classe 'hidden' em #tela1
    var tela1 = document.getElementById('tela1');
    if (tela1) {
      tela1.classList.add('hidden');
    }

    // Se o parâmetro 'scrollFim' existir, espera o layout carregar e vai direto para o fim
    if (scrollFim === 'true') {
      // Garante que o layout está completamente carregado antes de rolar
      setTimeout(function() {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'auto' });
      }, 500);  // Timeout para garantir que o conteúdo está completamente carregado
    }
  }
});
 conteudo exclusivo bkp*/

 //conteudo exclusivo
/*conteudo exclusivo */
document.addEventListener('DOMContentLoaded', function() {
 var video = document.getElementById('videoBG');
 video.muted = true;
 video.play();

 // Verifica se o parâmetro 'mostrarTela7' está presente na URL
 var urlParams = new URLSearchParams(window.location.search);
 var mostrarTela7 = urlParams.get('mostrarTela7');
 var scrollFim = urlParams.get('scrollFim'); // Novo parâmetro para ir direto ao fim

 // Se o parâmetro 'mostrarTela7' existir, remove a classe 'hidden' do #tela7
 if (mostrarTela7 === 'true') {
   var tela7 = document.getElementById('tela7');
   if (tela7) {
     tela7.classList.remove('hidden');
   }

   // Aplica a classe 'hidden' em #tela1
   var tela1 = document.getElementById('tela1');
   if (tela1) {
     tela1.classList.add('hidden');
   }

   // Se o parâmetro 'scrollFim' existir, rola até o topo da div .blocoAudio
   if (scrollFim === 'true') {
     // Garante que o layout está completamente carregado antes de rolar
     setTimeout(function() {
       var blocoAudio = document.querySelector('.blocoAudio');
       if (blocoAudio) {
         blocoAudio.scrollIntoView({ behavior: 'smooth', block: 'start' });
       }
     }, 500);  // Timeout para garantir que o conteúdo está completamente carregado
   }
 }
});
/* conteudo exclusivo */

 //conteudo exclusivo



/* audios */
function setupAudioPlayer(audioId, playPauseBtnId, seekSliderId, currentTimeElId, volumeSliderId) {
  const audio = document.getElementById(audioId);
  const playPauseBtn = document.getElementById(playPauseBtnId);
  const seekSlider = document.getElementById(seekSliderId);
  const currentTimeEl = document.getElementById(currentTimeElId);
  const volumeSlider = document.getElementById(volumeSliderId);

  playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playPauseBtn.innerHTML = '&#10074;&#10074;';  // Pause symbol
    } else {
      audio.pause();
      playPauseBtn.innerHTML = '&#9658;';  // Play symbol
    }
  });

  audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    seekSlider.value = (currentTime / duration) * 100;

    // Atualiza a exibição do tempo
    currentTimeEl.textContent = formatTime(currentTime);
  });

  seekSlider.addEventListener('input', () => {
    audio.currentTime = (seekSlider.value / 100) * audio.duration;
  });

  volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value / 100;
  });

  audio.addEventListener('loadedmetadata', () => {
    currentTimeEl.textContent = formatTime(audio.duration);
  });
}

// Formatação do tempo para exibição
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

setupAudioPlayer('audio-1', 'play-pause-btn-1', 'seek-slider-1', 'current-time-1', 'volume-slider-1');
setupAudioPlayer('audio-2', 'play-pause-btn-2', 'seek-slider-2', 'current-time-2', 'volume-slider-2');
setupAudioPlayer('audio-3', 'play-pause-btn-3', 'seek-slider-3', 'current-time-3', 'volume-slider-3');
/* audios */

/* video */
function trocarVideo(videoSrc, posterSrc) {
  const videoPlayer = document.getElementById('player');
  videoPlayer.src = videoSrc;       // Define o novo vídeo
  videoPlayer.poster = posterSrc;   // Define a miniatura do vídeo
  videoPlayer.load();               // Recarrega o vídeo
  videoPlayer.play();               // Reproduz o vídeo automaticamente
}
/* video */



/* audio - tema */
window.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("meuAudio");

  // Verifica se a reprodução automática é permitida
  audio.play().catch((error) => {
    console.log("Autoplay bloqueado. Tentando reproduzir sem áudio...");
    audio.muted = true;
    audio.play();
  });

  window.audio = audio; 
});

function pausaAudio() {
  console.log("muta");
  window.audio.pause(); // Pausa o áudio
  document.getElementById('audioTocando').classList.add('hidden');
  document.getElementById('audioMutado').classList.remove('hidden');
}

function tocaAudio() {
  console.log('toca');
  window.audio.play(); // Toca o áudio
  document.getElementById('audioMutado').classList.add('hidden');
  document.getElementById('audioTocando').classList.remove('hidden');
}
/* audio - tema */

/* icones redes */
document.querySelector(".insta").addEventListener("click", function() {
  window.location.href = "https://www.instagram.com/bodegacostantinibrasil/";
});

document.querySelector(".face").addEventListener("click", function() {
  window.location.href = "https://www.facebook.com/profile.php?id=61557155661514";
});

document.querySelector(".wtsp").addEventListener("click", function() {
  window.location.href = "https://wa.me/5541912345678";
});

document.querySelector(".telegram").addEventListener("click", function() {
  window.location.href = "https://t.me/seuusername";
});
/* icones redes */


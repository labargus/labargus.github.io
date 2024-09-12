$(".creditos").on("click", function () {
  $(".modal").toggleClass("is-active");
  $("html").css("overflow", "hidden");
});

$(".modal-close").on("click", function () {
  $(".modal").toggleClass("is-active");
  $("html").css("overflow", "auto");
});

document.addEventListener('DOMContentLoaded', () => { 
  // This is the bare minimum JavaScript. You can opt to pass no arguments to setup.
  const player = new Plyr('#plyrlist');
  
  // Expose
  window.player = player;

  
  // Bind event listener
  function on(selector, type, callback) {
    document.querySelector(selector).addEventListener(type, callback, false);
  }

 
});

$(document).ready(() => {
  $('.player-src').on('click', function () {

    imagens = $(this).data('image');

      src = $(this).data("src");
      type = 'audio/' + $(this).data("type");


      player.source = {
        type: 'audio',
        title: 'Example title',
        sources: [
          {
            src: src,
            type: type,
          }
        ],

      };

      player.play();

    $('.player-src').removeClass('active');
    $(this).addClass('active');
    $('.plyr__controls').css({ 'background': 'linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%), url('+ imagens +')'});



  });
})

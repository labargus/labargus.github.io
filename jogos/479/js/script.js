// Animation
var pintura2=document.querySelector(".pintura2");
var pintura3=document.querySelector(".pintura3");

  var tl = anime.timeline({
    duration: 4000,
    autoplay: false,
  });
  
  tl
  .add({
    targets: pintura2,
    translateX: 200,
  })
  .add({
    targets: pintura3,
    translateX: 300,
  }, '-=100')

  
  // Animate on scroll
  const animateOnScroll = function () {
    const scrollPercent = window.pageYOffset;
    //console.log((scrollPercent + 0) / 100);
    return (scrollPercent + 0) / 100;
  };
  
  // Scroll listener
  window.onscroll = function () {
    //animation.seek(animateOnScroll(pintura2, 1000, 200) * animation.duration);
    //console.log((animateOnScroll() / 100) * animation.duration)
    tl.seek((animateOnScroll() / 100) * tl.duration);
    
  };
  
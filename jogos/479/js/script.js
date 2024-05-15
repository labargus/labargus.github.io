// Animation
var pintura2=document.querySelector(".pintura2");
const animation = anime({
    targets: pintura2,
    opacity: 1,
    duration: 4000,
    autoplay: false,
  });
  
  const section2 = document.querySelector(".section-2");
  
  // Animate on scroll
  const animateOnScroll = function () {
    const scrollPercent = window.pageYOffset;
    console.log(scrollPercent,window.pageYOffset,window.innerHeight);
    return (scrollPercent + 0) / 100;
  };
  
  // Scroll listener
  window.onscroll = function () {
    //animation.seek(animateOnScroll(pintura2, 1000, 200) * animation.duration);
    animation.seek((animateOnScroll() / 100) * animation.duration);
    
  };
  
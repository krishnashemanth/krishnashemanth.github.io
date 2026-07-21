(function(){
  var nav = document.querySelector('.v2-nav');
  if(!nav) return;
  var THRESHOLD = 40;
  function update(){
    if(window.scrollY > THRESHOLD){ nav.classList.add('scrolled'); }
    else{ nav.classList.remove('scrolled'); }
  }
  var ticking = false;
  window.addEventListener('scroll', function(){
    if(!ticking){
      window.requestAnimationFrame(function(){ update(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });
  update();
})();

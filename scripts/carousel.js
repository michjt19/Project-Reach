/**
 * Purpose: Testimonial carousel — prev/next, dots, 6s auto-advance, pause on hover.
 * Respects prefers-reduced-motion.
 */
(function () {
  var wrapper = document.querySelector('.carousel-wrapper');
  if (!wrapper) return;

  var track = wrapper.querySelector('.carousel-track');
  var cards = Array.from(track.querySelectorAll('.testimonial-card'));
  var dots = Array.from(wrapper.querySelectorAll('.carousel-dot'));
  var prevBtn = wrapper.querySelector('.carousel-btn--prev');
  var nextBtn = wrapper.querySelector('.carousel-btn--next');
  var current = 0;
  var autoTimer = null;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function goTo(index) {
    current = (index + cards.length) % cards.length;
    track.style.transform = 'translateX(' + (-current * 100) + '%)';
    dots.forEach(function (d, i) { d.classList.toggle('active', i === current); });
  }

  function startAuto() {
    if (reducedMotion) return;
    autoTimer = setInterval(function () { goTo(current + 1); }, 6000);
  }

  function stopAuto() {
    clearInterval(autoTimer);
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { stopAuto(); goTo(current - 1); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', function () { stopAuto(); goTo(current + 1); startAuto(); });

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () { stopAuto(); goTo(i); startAuto(); });
  });

  wrapper.addEventListener('mouseenter', stopAuto);
  wrapper.addEventListener('mouseleave', startAuto);

  wrapper.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      stopAuto(); goTo(current - 1); startAuto();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      stopAuto(); goTo(current + 1); startAuto();
    }
  });

  goTo(0);
  startAuto();
})();

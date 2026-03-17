/**
 * Purpose: Intersection Observer for .fade-in-up elements and floating CTA scroll trigger.
 */
(function () {
  // Fade-in-up
  var faders = document.querySelectorAll('.fade-in-up');
  if (faders.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    faders.forEach(function (el) { observer.observe(el); });
  } else {
    faders.forEach(function (el) { el.classList.add('visible'); });
  }

  // Floating CTA
  var cta = document.getElementById('floatingCta');
  if (cta) {
    var onScroll = function () {
      cta.classList.toggle('visible', window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();

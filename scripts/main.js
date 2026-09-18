document.querySelectorAll('#current-year').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

document.querySelectorAll('.navbar-collapse .nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    const openMenu = document.querySelector('.navbar-collapse.show');
    if (openMenu) {
      bootstrap.Collapse.getOrCreateInstance(openMenu).hide();
    }
  });
});

const parallaxImage = document.querySelector('[data-parallax]');
const parallaxQuery = window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)');

if (parallaxImage) {
  let frameId;

  const updateParallax = () => {
    frameId = undefined;

    if (!parallaxQuery.matches) {
      parallaxImage.style.setProperty('--parallax-offset', '0px');
      return;
    }

    const heroBounds = parallaxImage.parentElement.getBoundingClientRect();
    const offset = Math.max(-72, Math.min(72, heroBounds.top * -0.16));
    parallaxImage.style.setProperty('--parallax-offset', `${offset}px`);
  };

  const requestParallaxUpdate = () => {
    if (!frameId) {
      frameId = window.requestAnimationFrame(updateParallax);
    }
  };

  parallaxQuery.addEventListener('change', requestParallaxUpdate);
  window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
  window.addEventListener('resize', requestParallaxUpdate);
  requestParallaxUpdate();
}

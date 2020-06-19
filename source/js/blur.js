//Blur
const blur = (() => {
  const wrapper = document.querySelector('.reviews__form');
  const form = document.querySelector('.reviews__form-blur');
  const reviewsBg = document.querySelector('.reviews__bg');

  return {
    set: () => {
      const imgWidth = reviewsBg.offsetWidth;
      const imgHeight = reviewsBg.offsetHeight;
      const posLeft = -wrapper.offsetLeft;
      const posTop = -wrapper.offsetTop;

      form.style.backgroundSize = `${imgWidth}px ${imgHeight}px`;
      form.style.backgroundPosition = `${posLeft}px ${posTop}px`;
    }
  }
})();

if (document.querySelector('.reviews__bg')) {
  blur.set();

  window.addEventListener('resize', () => {
    blur.set();
  }) 
};
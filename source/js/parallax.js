//Parallax
const parallax = (function () {
  const bg = document.querySelector('.hero__bg');
  const sectionTitle = document.querySelector('.section-title__pic');
  const user = document.querySelector('.user__block');

  return {
    move: function (block, windowScroll, strafeAmount) {

      if (block === null) return;
      
      //сдвиг в процентах
      const strafe = windowScroll / -strafeAmount + '%';

      const transformString = `translate3d(0, ${strafe}, 0)`;
      
      block.style.transform = transformString;
      block.style.webkitTransform = transformString;
    },

    init: function (wScroll) {
      this.move(bg, wScroll, 45);
      this.move(sectionTitle, wScroll, 20);
      this.move(user, wScroll, 3);
    }
  }
}());

window.addEventListener('scroll', () => {
  parallax.init(window.pageYOffset);
});

window.addEventListener('load', () => {
  parallax.init(window.pageYOffset);
});

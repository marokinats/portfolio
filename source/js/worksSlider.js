//Slider

const duration = 500;
let imageCounter = 1;
let inProgress = false;

let addActiveToDesc = $(document).ready(() => {
  $('.works__desc').first().addClass('active');
});

//Функция, которая двигает слайды
//container - определяет левый или правый элемент слайдера
//direction - направление прокрутки слайдов
const moveSlides = (container, direction) => {

  const items = $(container).find('.slider__item');
  const activeItem = items.filter('.active');
  const activeItemIndex = activeItem.index();

  let counter = activeItemIndex + 1;

  const images = $('.works__display-list').find('.works__display-item');
  const activeImage = images.filter('.active');

  const descriptions = $('.works__left').find('.works__desc');
  const activeDesc = descriptions.filter('.active');
  
  const strafeTopPercents = direction === 'down' ? 100 : -100;

  if (counter >= items.length) {
    counter = 0;
  }

  if (imageCounter >= images.length) {
    imageCounter = 0;
  }

  //Next
  const reqItem = items.eq(counter);
  const reqImage = images.eq(imageCounter);
  const reqDesc = descriptions.eq(imageCounter);

  //Листаем
  activeItem.animate({
    'top': `${strafeTopPercents}%`
  }, duration);

  reqItem.animate({
    'top': '0'
  }, duration, function () {
    activeItem.removeClass('active')
      .css('top', `${-strafeTopPercents}%`);
    $(this).addClass('active');

    inProgress = false;
  });

  activeImage.removeClass('active');
  reqImage.addClass('active');

  activeDesc.removeClass('active');
  reqDesc.addClass('active');
};

$('.slider__control').on('click', function (e) {
  e.preventDefault();

  if (inProgress) return;
  inProgress = true;

  moveSlides('#slider-left', 'down');
  moveSlides('#slider-right', 'up');
  imageCounter++;
});

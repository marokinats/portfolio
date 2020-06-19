//Slider
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.works__left').firstElementChild.classList.add('active');
});

const duration = 500; //время анимации

let imageCounter = 1;
let inProgress = false;



//Функция, которая двигает слайды
//container - определяет левый или правый элемент слайдера
//direction - направление прокрутки слайдов
const moveSlides = (container, direction) => {
  
  const items = [...container.children];
  const [activeItem] = items.filter(item => item.classList.contains('active'));
  const activeItemIndex = activeItem.dataset.id;
  let counter = activeItemIndex + 1;

  const images = [...document.querySelector('.works__display-list').children];
  const [activeImage] = images.filter(item => item.classList.contains('active'));

  const descriptions = [...document.querySelector('.works__left').children];
  const [activeDesc] = descriptions.filter(item => item.classList.contains('active'));
  

  //Переменная управляет направлением прокрутки
  const strafeTopPercents = direction === 'down' ? 100 : -100;

  //Обнуляем counter
  if (counter > items.length) {
    counter = 1;
  };

  if (imageCounter > images.length) {
    imageCounter = 1;
  };

  //Слайдер, к которому необходимо пролистать
  const [reqItem] = items.filter(item => item.dataset.id == counter);

  //Картинка-пример, к которой надо пролистать
  const [reqImage] = images.filter(item => item.dataset.id == imageCounter);

  //Описание, к которому надо пролистать
  const [reqDesc] = descriptions.filter(item => item.dataset.id == imageCounter);

  //Листаем слайдер:
  //текущий уходит вниз,
  //следующий за ним опускается на его место, ему добавляется класс active
  //который ушел вниз, переходит наверх, класс active удаляем
  // activeItem.animate({
  //   'transform': `translateY(${strafeTopPercents}%)`
  // }, duration);

  // reqItem.animate({
  //   'transform': 'translateY(0)'
  // }, duration, function () {
  //   activeItem.removeClass('active')
  //     .css('transform', `translateY(${-strafeTopPercents}%)`);
  //   $(this).addClass('active');

  //   inProgress = false;
  // });
  activeItem.classList.remove('active');
  reqItem.classList.add('active');
  inProgress = false;

  //Листаем картинки-примеры
  activeImage.classList.remove('active');
  reqImage.classList.add('active');

  //Листаем описание
  activeDesc.classList.remove('active');
  reqDesc.classList.add('active');

};

$('.slider__control').on('click', function (e) {
  e.preventDefault();

  if (inProgress) return;
  inProgress = true;

  moveSlides(document.querySelector('#slider-left'), 'down');
  moveSlides(document.querySelector('#slider-right'), 'up');
  imageCounter++;
});

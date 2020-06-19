//Preloader

const preloader = document.querySelector('.preloader');

let currentNode,
  imgPaths = [];
const nodesIterator = document.createNodeIterator(document.body, NodeFilter.SHOW_ELEMENT);

while (currentNode = nodesIterator.nextNode()) {

  const isImg = currentNode.tagName === 'IMG';
  const background = window.getComputedStyle(currentNode).backgroundImage;

  if (isImg) {
    imgPaths.push(currentNode.getAttribute('src'));
  }

  if (background !== 'none') {
    imgPaths.push(background.replace('url("', '').replace('")', ''));
  }
}


//Метод для подсчета процентов
//total - сколько нужно загрузить, current - сколько уже загружено
const setPercents = (total, current) => {

  const percents = Math.ceil(current / total * 100);

  document.querySelector('.preloader__percents').innerHTML = `${percents} %`;

  if (percents >= 100) preloader.style.display = "none";
};


let percentsTotal = 0;

//Создаем fake-картинку и имитируем загрузку
const loadImages = images => {

  if (!images.length) return;

  images.forEach((img, i, images) => {

    const fakeImg = document.createElement('img');
    fakeImg.setAttribute('src', img);
    document.body.appendChild(fakeImg);

    const loadingHandler = () => {
      percentsTotal++;
      document.body.removeChild(fakeImg);
      setPercents(images.length, percentsTotal);
    }

    fakeImg.addEventListener('load', loadingHandler);
    fakeImg.addEventListener('error', loadingHandler);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  loadImages(imgPaths);
});
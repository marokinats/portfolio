//Flip

const authButton = document.querySelector('.welcome__authorization-btn'),
  returnButton = document.querySelector('.authorization__button_return');

if (authButton && returnButton) {
  authButton.addEventListener('click', () => {
    flip();
  });
  returnButton.addEventListener('click', () => {
    flip();
  });
}

const flip = () => {
  const flipCard = document.querySelector('#flip-user'),
    flipAuth = document.querySelector('#flip-auth');

  flipCard.classList.toggle('flipped');
  flipAuth.classList.toggle('flipped');

  //Скрыть кнопку Авторизации
  if (flipCard.classList.contains('flipped')) {
    authButton.style.display = 'none';
  } else {
    authButton.style.display = 'block';
  }
}


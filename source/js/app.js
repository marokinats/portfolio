// (function() {
//   'use strict';

//   setTimeout(function() {
//     document.querySelector('.greating_picture').classList.add('m--show');
//   }, 1000);
// })();

//Preloader
let percentsTotal = 0;
const preloader = $('.preloader');
//Перебираем все элементы на странице, чтобы собрать пути до картинок(img или bg)
const imgPaths = $('*').map((ndx, elem) => {
	//Проверим, является ли элемен img, если true - сохраняем в переменную,
	//если false - не сохраняем
	const isImg = $(elem).is('img');
	//Переменная содержит bg элемента (путь до картинки)
	const background = $(elem).css('background-image');
	//В переменную сохраняем пути до img
	let path = '';

	if (isImg) {
		path = $(elem).attr('src');
	}

	if (background != 'none') {
		path = background.replace('url("', '').replace('")', '');
	}

	if (path) return path;//Если path не пустой, то ф-ция возвращает его
});

//Метод для подсчета процентов
//total - сколько нужно загрузить, current - сколько уже загружено
const setPercents = (total, current) => {
	const percents = Math.ceil(current / total * 100);

	$('.preloader__percents').text(`${percents}%`);

	//Проверка, если все картинки загружены, прелоадер убираем
	//fadeOut() - изменяет блоку opacity до 0 и затем добавляет display:none;
	if (percents >= 100) preloader.fadeOut();
};

//Подгружаем картинки
const loadImages = (images) => {
	//Если картинки не загружены(длина массива равна 0), то ф-ция не выполнится
	if (!images.length) return;

	//Переберем картинки
	images.forEach((img, i, images) => {
		//Создаем картинку
		const fakeImg = $('<img>', {
			'attr' : {
				'src' : img
			}
		});

		//Проверяем, загрузилась картинка или нет
		fakeImg.on('load error', () => {
			//Если картинка загрузилась, то увеличиваем проценты на 1
			percentsTotal++;
			//В ф-цию, которая считает проценты,
			//передаем сколько всего нужно загрузить(images.length),
			//и сколько уже загружено (percentsTotal)
			setPercents(images.length, percentsTotal);
		});
	});
};

//Преобразуем imgPaths в массив
const imgs = imgPaths.toArray();

$(document).ready(() => {
	loadImages(imgs);
});


//Flip
function flip() {
    $('.flip__id').toggleClass('flipped');
    //Скрыть кнопку Авторизации
    if ($('.welcome__content').hasClass('flipped')) {
    	$('.welcome__authorization-button').css('display', 'none');
    }else {
    	$('.welcome__authorization-button').css('display', 'block');
    };
};

//Parallax
var parallax = (function () {
	var bg = document.querySelector('.hero__bg');
	var sectionTitle = document.querySelector('.section-title__pic');
	var user = document.querySelector('.user__block');

	return {
		move: function (block, windowScroll, strafeAmount) {
			//Рассчитаем сдвиг в процентах
			var strafe = windowScroll / -strafeAmount + '%';
			//переменная для стиля, который будем изменять
			var transformString = 'translate3d(0, ' + strafe + ', 0)';
			//Задаем переменную, куда будем передавать стиль для блока, который будем изменять
			var newStyle = block.style;

			newStyle.transform = transformString;
			newStyle.webkitTransform = transformString;
		},

		init: function (wScroll) {
			this.move(bg, wScroll, 45);
			this.move(sectionTitle, wScroll, 20);
			this.move(user, wScroll, 3);
		}
	}
}());

window.onscroll = function () {
	var wScroll = window.pageYOffset;

	parallax.init(wScroll);
};

//Blur
var blur = (function () {
	var wrapper = document.querySelector('.reviews__form');
	var form = document.querySelector('.reviews__form-blur');
	var reviewsBg = document.querySelector('.reviews__bg');

	return {
		set: function () {
			var imgWidth = reviewsBg.offsetWidth;
			var imgHeight = reviewsBg.offsetHeight;
			var posLeft = -wrapper.offsetLeft;
			var posTop = -wrapper.offsetTop;
			blurCSS = form.style;

			//blurCSS.backgroundSize = imgWidth + 'px' + ' ' + 'auto';
			blurCSS.backgroundSize = imgWidth + 'px' + ' ' + imgHeight + 'px';
			blurCSS.backgroundPosition = posLeft + 'px' + ' ' + posTop + 'px';

		}
	}
}());

if (document.querySelector('.reviews__bg')) {
	blur.set();

	window.onresize = function () {
	blur.set();
	};
};

//Slider
//Для того, чтобы управлять временем анимации
const duration = 500;
//Счетчик
let imageCounter = 1;
//Переменная, чтобы не сбоила анимация при частых нажатиях кнопки "листать"
let inProgress = false;

let addActiveToDesc = $(document).ready(() => {
	$('.works__desc').first().addClass('active');
});
//Функция, которая двигает слайды
//container - определяет левый или правый элемент слайдера
//direction - направление прокрутки слайдов
const moveSlides = (container, direction) => {
	//переменная содержит все слайды
	let items = $(container).find('.slider__item');
	
	let activeItem = items.filter('.active');

	let activeItemIndex = activeItem.index();

	let counter = activeItemIndex + 1;

	let images = $('.works__display-examples').find('.works__display-example-pic');

	let activeImage = images.filter('.active');

	let descriptions = $('.works__description').find('.works__desc');
	
	let activeDesc = descriptions.filter('.active');
	// let imagesPath = [];
	// images.each(function(i, image){imagesPath.push($(image).attr('src'))});

	//Переменная управляет направлением прокрутки
	let strafeTopPercents = direction === 'down' ? 100 : -100;

	//Обнуляем counter
	if (counter >= items.length) {
		counter = 0;
	};

	if (imageCounter >= images.length) {
		imageCounter = 0;
	};

	//Слайдер, к которому необходимо пролистать
	const reqItem = items.eq(counter);

	//Картинка-пример, к которой надо пролистать
	const reqImage = images.eq(imageCounter);

	//Описание, к которому надо пролистать
	const reqDesc = descriptions.eq(imageCounter);

	//Листаем слайдер:
	//текущий уходит вниз,
	//следующий за ним опускается на его место, ему добавляется класс active
	//который ушел вниз, переходит наверх, класс active удаляем
	activeItem.animate({
		'top' : `${strafeTopPercents}%`
	}, duration);

	reqItem.animate({
		'top' : '0'
	}, duration, function() {
		activeItem.removeClass('active')
			.css('top', `${-strafeTopPercents}%`);
		$(this).addClass('active');
		
		inProgress = false;
	});

	//Листаем картинки-примеры
	activeImage.removeClass('active');
	reqImage.addClass('active');

	//Листаем описание
	activeDesc.removeClass('active');
	reqDesc.addClass('active');

};

$('.slider__control').on('click', function(e) {
	e.preventDefault(); 

	if (inProgress) return;
	inProgress = true;

	moveSlides('.slider__first', 'down');
	moveSlides('.slider__opposite', 'up');
	imageCounter++;
});


//Sidebar

//Фиксируем сайдбар
$(function() {
	$(window).scroll(function() {
		var sectionHeight = $('.hero').outerHeight();
		var sidebarWidth = $('.blog__sidebar').outerWidth();
		let deltaY = $(window).scrollTop();//Сколько проскроллили от верха окна браузера
		if (deltaY >= sectionHeight) {
			$('.blog__nav').css({
				'position': 'fixed',
				'max-width': sidebarWidth + 'px',
				'top': '60px'
			});
		} else {
			$('.blog__nav').css({
				'position': 'relative',
				'top': '0'
			});
		}
	});
});

//навигация по статьям в блоге
$('.blog__nav').find('.blog__nav-link').on('click', function(e) {
	e.preventDefault();

	var $this = $(this);
	var article = $this.closest('.blog').find('.blog__article').filter($this.attr('href'));

		// var docBody = $(document.body);
		// docBody.animate({
		// 	scrollTop: article.offset().top
		// });
		
})

$(window).scroll(function() {

		var $this = $(this);
		var articles = [];

		$('.blog__articles').find('.blog__article').each(function() {
			articles.push($(this));
		});

		for(var i = 0; i < articles.length; i++) {
			if(($this.scrollTop() >= articles[i].offset().top)) {
				articles[i].closest('.blog').find('.blog__nav-item').filter('.active').removeClass('active');
				articles[i].closest('.blog').find('.blog__nav-link[href="#' + articles[i].attr('id') + '"]').closest('.blog__nav-item').addClass('active');
			}
		}
		if($(document.body).find('.blog__article-header').length) {
			if(document.body.scrollHeight === document.body.scrollTop + document.body.offsetHeight) {
				articles[articles.length - 1].closest('.blog').find('.blog__nav-item').filter('.active').removeClass('active');
				articles[articles.length - 1].closest('.blog').find('.blog__nav-link[href="#' + articles[articles.length - 1].attr('id') + '"]').closest('.blog__nav-item').addClass('active');
			}
		}

})

//Burger-menu
$('.burger-menu__close').on('click', function(e) {
		e.preventDefault();

		var $this = $(this);

		$this.toggleClass('burger-menu__close_change');
		
		if($this.next().hasClass('hidden')) {
			$this.next().removeClass('hidden');
			$this.next().find('.burger-menu__open-left').stop().animate({
				'right': '50%'
			}, 500);
			$this.next().find('.burger-menu__open-right').stop().animate({
				'left': '50%'
			}, 500, function() {
				$(this).siblings('.burger-menu__open-text').stop().animate({
					'opacity': '1'
				}, 200)
			});
		} else {
			$this.next().find('.burger-menu__open-text').stop().animate({
				'opacity': '0'
			}, 200, function() {
				$(this).siblings('.burger-menu__open-left').stop().animate({
					'right': '100%'
				}, 500);
				$(this).siblings('.burger-menu__open-right').stop().animate({
					'left': '100%'
				}, 500, function() {
					$this.next().addClass('hidden');
				});
			})
		}
})

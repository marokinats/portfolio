var parallax = (function () {
	var bg = document.querySelector('.hero__bg');
	var sectionTitle = document.querySelector('.section-title__pic');
	var user = document.querySelector('.hero__user');

	return {
		move: function (block, windowScroll, strafeAmount) {
			//Рассчитаем сдвиг в процентах
			var strafe = windowScroll / -strafeAmount + '%';
			//Задаем переменную - стиль для блока, который будем изменять
			var style = block.style;

			style.top = strafe;
		},
	}


}());


window.onscroll = function () {
	var wScroll = window.pageYOffset;
}
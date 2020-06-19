//Sidebar

//Фиксируем сайдбар
$(function () {
  $(window).scroll(function () {
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
$('.blog__nav').find('.blog__nav-link').on('click', function (e) {
  e.preventDefault();

  var $this = $(this);
  var article = $this.closest('.blog').find('.blog__article').filter($this.attr('href'));

  // var docBody = $(document.body);
  // docBody.animate({
  // 	scrollTop: article.offset().top
  // });

})

$(window).scroll(function () {

  var $this = $(this);
  var articles = [];

  $('.blog__articles').find('.blog__article').each(function () {
    articles.push($(this));
  });

  for (var i = 0; i < articles.length; i++) {
    if (($this.scrollTop() >= articles[i].offset().top)) {
      articles[i].closest('.blog').find('.blog__nav-item').filter('.active').removeClass('active');
      articles[i].closest('.blog').find('.blog__nav-link[href="#' + articles[i].attr('id') + '"]').closest('.blog__nav-item').addClass('active');
    }
  }
  if ($(document.body).find('.blog__article-header').length) {
    if (document.body.scrollHeight === document.body.scrollTop + document.body.offsetHeight) {
      articles[articles.length - 1].closest('.blog').find('.blog__nav-item').filter('.active').removeClass('active');
      articles[articles.length - 1].closest('.blog').find('.blog__nav-link[href="#' + articles[articles.length - 1].attr('id') + '"]').closest('.blog__nav-item').addClass('active');
    }
  }

})

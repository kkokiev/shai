//Common scripts

//ie fix
if(!(window.console && console.log)) {
	console = {
		log: function(){},
		debug: function(){},
		info: function(){},
		warn: function(){},
		error: function(){}
	};
}


(function () {
	
	var $body = $('body');
	var $navBtn = $('#nav-btn');
	var $headerNav = $('#header-nav');

	/*setup sticky footer*/
	var paddingHandler = function(){
		var footerHeight = $('#footer').innerHeight();

		$('#main-wrapper').css({'padding-bottom':footerHeight});
		
	};
	$(window).on('load', paddingHandler);
	$(window).on('resize', paddingHandler);

	/*setup mobile nav */
	$navBtn.on('click', function(){
		$(this).toggleClass('nav-btn_opened')
		$headerNav.stop().slideToggle();
	});

	var navbarHandler = function(){
		$navBtn.removeClass('nav-btn_opened');
		if($(window).width() > 800) {
			$headerNav.show();
		} else {
			$headerNav.hide();
		}
	};

	$(window).on('resize', navbarHandler);


	/*setup smooth scroll*/
	$('a[href*=\\#]:not([href=\\#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

			if (target.length)
			{	
				var $headerHeight = $('.header').innerHeight(),
					$windowWidth = $(window).width();

				$('html,body').animate({
					scrollTop: target.offset().top - ($headerHeight)
				}, 1000);
				return false;

				// if ($windowWidth > 1100){

				// 	$('html,body').animate({
				// 		scrollTop: target.offset().top - ($headerHeight / 2)
				// 	}, 1000);
				// 	return false;

				// } else {

				// 	$('html,body').animate({
				// 		scrollTop: target.offset().top - ($headerHeight)
				// 	}, 1000);
				// 	return false;

				// }
			}
		}
	});

	/*setup gallery*/
	var $gallery = $('.gallery').masonry({
		itemSelector: '.gallery__col',
		columnWidth: '.gallery__col-sizer',
		percentPosition: true
	});

	$gallery.imagesLoaded().progress( function() {
		$gallery.masonry('layout');
	});

	$body.on('click', '.gallery__col', function(e){
		if($(this).hasClass('gallery__col_opened')) {
			return;
		} else {
			$(this).addClass('gallery__col_opened');
			$gallery.masonry('layout');
		}
	});

	/*setup parallax*/
	$('.js-parallax-1').parallax({
		imageSrc: 'images/homepage_parallax_1.jpg',
		parallax: 'scroll',
		bleed: '55'
	});

	$('.js-parallax-2').parallax({
		imageSrc: 'images/homepage_parallax_2.jpg',
		parallax: 'scroll',
		bleed: '55'
	});

})(jQuery);

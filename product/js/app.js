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


	/*setup sliders*/
	// $('#gallery-slider-1 .js-gallery-slider').bxSlider({
	// 	pager: false,
	// 	nextSelector: '#gallery-slider-1 .slider-btn_next',
	// 	prevSelector: '#gallery-slider-1 .slider-btn_prev',
	// 	nextText: '',
	// 	prevText: '',
	// 	infiniteLoop: false,
	// 	onSliderLoad: function(currentIndex) {
	// 		//setup slider counter
	// 		$('#gallery-slider-1 .js-slider-counter')
	// 			.html(currentIndex + 1);

	// 		//setup slider total count
	// 		$('#gallery-slider-1 .js-slider-total')
	// 			.html($('#gallery-slider-1 .js-gallery-slider li').length)

	// 		$('#gallery-slider-1 .js-slider-caption')
	// 			.html($('#gallery-slider-1 .js-gallery-slider')
	// 				.eq(currentIndex)
	// 				.find('img')
	// 				.attr('title'));
	// 	},
	// 	onSlideBefore: function($slideElement, oldIndex, newIndex) {
	// 		$('#gallery-slider-1 .js-slider-caption')
	// 			.html($slideElement.find('img').attr('title'));
	// 		//setup slider counter
	// 		$('#gallery-slider-1 .js-slider-counter')
	// 			.html(newIndex + 1);
	// 	}
	// });

	// $('#gallery-slider-2 .js-gallery-slider').bxSlider({
	// 	pager: false,
	// 	nextSelector: '#gallery-slider-2 .slider-btn_next',
	// 	prevSelector: '#gallery-slider-2 .slider-btn_prev',
	// 	nextText: '',
	// 	prevText: '',
	// 	infiniteLoop: false,
	// 	onSliderLoad: function(currentIndex) {
	// 		//setup slider counter
	// 		$('#gallery-slider-2 .js-slider-counter')
	// 			.html(currentIndex + 1);

	// 		//setup slider total count
	// 		$('#gallery-slider-2 .js-slider-total')
	// 			.html($('#gallery-slider-2 .js-gallery-slider li').length)

	// 		$('#gallery-slider-2 .js-slider-caption')
	// 			.html($('#gallery-slider-2 .js-gallery-slider')
	// 				.eq(currentIndex)
	// 				.find('img')
	// 				.attr('title'));
	// 	},
	// 	onSlideBefore: function($slideElement, oldIndex, newIndex) {
	// 		$('#gallery-slider-2 .js-slider-caption')
	// 			.html($slideElement.find('img').attr('title'));
	// 		//setup slider counter
	// 		$('#gallery-slider-2 .js-slider-counter')
	// 			.html(newIndex + 1);
	// 	}
	// });

	var gallerySlidersArray = ['#gallery-slider-1', '#gallery-slider-2'];

	gallerySlidersArray.forEach(function(slider){
		var $slider = $(slider);

		$slider.find('.js-gallery-slider').bxSlider({
			pager: false,
			nextSelector: slider + ' .slider-btn_next',
			prevSelector: slider + ' .slider-btn_prev',
			nextText: '',
			prevText: '',
			infiniteLoop: false,
			onSliderLoad: function(currentIndex) {
				//setup slider counter
				$slider.find('.js-slider-counter')
					.html(currentIndex + 1);

				//setup slider total count
				$slider.find('.js-slider-total')
					.html($slider.find('.js-gallery-slider li').length)

				$slider.find('.js-slider-caption')
					.html($slider.find('.js-gallery-slider')
						.eq(currentIndex)
						.find('img')
						.attr('title'));
			},
			onSlideBefore: function($slideElement, oldIndex, newIndex) {
				$slider.find('.js-slider-caption')
					.html($slideElement.find('img').attr('title'));
				//setup slider counter
				$slider.find('.js-slider-counter')
					.html(newIndex + 1);
			}
		});
	});

})(jQuery);


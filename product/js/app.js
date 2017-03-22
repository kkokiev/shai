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
	var $header = $('.header');

	var testMobile;
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};


	/*setup height for the video wrapper*/
	var setupVideoWrapHeight = function() {

		var headerHeight = $header.innerHeight();
		var newHeight = $(window).height() - headerHeight;
		$('.intro__video-wrap').css({
			height: newHeight
		});
	}

	setupVideoWrapHeight();
	$(window).on('resize', setupVideoWrapHeight);

	/*setup sticky footer*/
	var paddingHandler = function(){
		var footerHeight = $('#footer').innerHeight();

		$('#main-wrapper').css({'padding-bottom':footerHeight});
		
	};
	$(window).on('load', paddingHandler);
	$(window).on('resize', paddingHandler);



	/*setup mobile nav */
	$navBtn.on('click', function(e){
		e.preventDefault();
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



	/*
		setup parallax
	*/
	var parallaxElements = function(){

		$paraEl1 = $('.js-parallax-1'),
		$paraEl2 = $('.js-parallax-2');

		testMobile = isMobile.any();

		if(!testMobile) {

			$paraEl1.parallax({
				imageSrc: 'images/homepage_parallax_1.jpg',
				parallax: 'scroll',
				bleed: '55'
			});

			$paraEl2.parallax({
				imageSrc: 'images/homepage_parallax_2.jpg',
				parallax: 'scroll',
				bleed: '55'
			});
		} else {
			$paraEl1.css({'background-image': 'url(images/homepage_parallax_1.jpg)'});
			$paraEl2.css({'background-image': 'url(images/homepage_parallax_2.jpg)'});
		}

	};

	parallaxElements();




	/*
		setup vibe page gallery and sliders
	*/
	var $gallery = $('.gallery').masonry({
		itemSelector: '.gallery__col',
		columnWidth: '.gallery__col-sizer',
		percentPosition: true
	});

	$gallery.imagesLoaded().progress( function() {
		$gallery.masonry('layout');
	});

	var startSlider = function(slider) {
		var $slider = $(slider);
		$slider.find('.js-gallery-slider').bxSlider({
			slideWidth: $slider.width(),
			responsive: true,
			pager: false,
			nextSelector: slider + ' .slider-btn_next',
			prevSelector: slider + ' .slider-btn_prev',
			nextText: '',
			prevText: '',
			infiniteLoop: false,
			onSliderLoad: function(currentIndex) {
				//setup slider init counter
				$slider.find('.js-slider-counter')
					.html(currentIndex + 1);

				//setup slider total count
				$slider.find('.js-slider-total')
					.html($slider.find('.js-gallery-slider li').length)

				//setup slider init caption
				$slider.find('.js-slider-caption')
					.html($slider.find('.js-gallery-slider')
						.eq(currentIndex)
						.find('img')
						.attr('title'));
			},
			onSlideBefore: function($slideElement, oldIndex, newIndex) {
				//setup slider caption on slide change
				$slider.find('.js-slider-caption')
					.html($slideElement.find('img').attr('title'));
				//setup slider counter on slide change
				$slider.find('.js-slider-counter')
					.html(newIndex + 1);
			}
		});
	};


	$body.on('click', '.gallery__col', function(e){
		if($(this).hasClass('gallery__col_opened')) {
			//do nothing
			return;
		} else {
			//enlarge current gallery item
			$(this).addClass('gallery__col_opened');

			//show and setup slider inside item
			$(this).find('.gallery__slide-wrap').show();
			var currentId = $(this).find('.gallery__slide-wrap').attr('id');
			currentId = '#' + currentId;
			startSlider(currentId);

			//hide overlay picture
			$(this).find('.gallery__overlay').hide();
			//refresh layout
			$gallery.masonry('layout');
		}
	});
	/*
		end setup vibe page gallery and sliders
	*/



	/*
		setup counters on the index page
	*/
	var countStart = true;
	var setupCount = function() {
		if($('.js-count').length > 0) {
			var t = $('.js-count').offset().top;
			var s = $(window).scrollTop() + $(window).height();


			if(s > t && countStart === true ){

				$('.js-count').each(function () {
					$(this).prop('Counter', 0).animate({
						Counter: $(this).text()
					}, {
						duration: 4000,
						easing: 'swing',
						step: function (now) {
							$(this).text(Math.ceil(now));
						}
					});

				});

				countStart = false;
			}
		} else {
			return;
		}

	}

	setupCount();

	$(window).scroll(function() {
		setupCount();
	});

	$(window).resize(function() {
		setupCount();
	});
	/*
		end setup counters on the index page
	*/



	/*
		setup sticky elements
	*/

	var stickyElements = (function() {

		var $introHeader = $('.js-intro-header'),
		introHeaderHeight = $introHeader.innerHeight();

		$introHeader.sticky({
			zIndex: 1100
		});

		$('.js-portfolio-menu').sticky({
			zIndex: 1000,
			topSpacing: introHeaderHeight
		});

	})();

	/*
		end setup sticky elements
	*/


	/*
		resize video
	*/
	var resizeVideo = function(){
		
		$video = $('#intro-video');
		var winHeight = $(window).innerHeight();
		var winWidth = $(window).innerWidth();
			
		var aspectRatioVideo = 0.5625;
		var aspectRatioWindow = winHeight / winWidth;

		if(aspectRatioWindow > aspectRatioVideo ){

			$video.css("height", winHeight); 
			$video.css("width", winHeight / aspectRatioVideo); 
			$video.css("left", -Math.abs($video.width() - winWidth)/2); 

		} else {

			$video.css("width", winWidth); 
			$video.css("height", winWidth * aspectRatioVideo); 
			$video.css("top", -Math.abs($video.height() - winHeight)/2);
			
		}

	}

	resizeVideo();

	$(window).resize(function() {
		resizeVideo();
	});

})(jQuery);


/*make portfolio items animated*/
(function() {

	$.fn.visible = function(partial) {
	
		var $t = $(this),
			$w = $(window),
			viewTop = $w.scrollTop() - 200,
			viewBottom = viewTop + $w.height(),
			_top = $t.offset().top,
			_bottom = _top + $t.height(),
			compareTop = partial === true ? _bottom : _top,
			compareBottom = partial === true ? _top : _bottom;
	
		return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

	};

	var win = $(window),
		items = $(".portfolio__col");

	win.scroll(function(event) {
		items.each(function(i, el) {
			var el = $(el);
			if (el.visible(true)) {
				el.addClass("portfolio__col_visible"); 
			} 
		});
	
	});
		win.load(function(event) {
		items.each(function(i, el) {
			var el = $(el);
			if (el.visible(true)) {
				el.addClass("portfolio__col_visible"); 
			} 
		});
	})
	
})(jQuery);

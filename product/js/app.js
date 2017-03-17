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

	/*setup sticky footer*/
	var handler = function(){
		var footerHeight = $('#footer').height();

		$('#main-wrapper').css({'padding-bottom':footerHeight});
		
	};
	$(window).on('load', handler);
	$(window).on('resize', handler);


})(jQuery);


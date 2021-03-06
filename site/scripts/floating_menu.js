
// create or use existing site scope
var Site = Site || {};

/**
 * @param object menu               jQuery object
 * @param object trigger_element    jQuery object
 */
function FloatingMenu(menu, trigger_element) {
	var self = this;

	self.menu = menu;
	self.position = trigger_element.offset().top;
	self.active = false;
	  
	/**
	 * Object initialization.
	 */
	self._init = function() {
		// connect signals
		$(window).on('scroll', self.handle_scroll);

		// set initial state
		self.handle_scroll(null);
	};
	
	/**
	 * Handle window scroll.
	 *
	 * @param object event
	 */
	self.handle_scroll = function(event) {
		var over_position = $(window).scrollTop() >= self.position;
		
		if (over_position && !self.active) {
			self.menu.addClass('active');
			$('body').addClass('active');
			self.active = true;

		} else if (!over_position && self.active) {
			self.menu.removeClass('active');
			$('body').removeClass('active');
			self.active = false;
		}
	};

	// finalize object
	self._init();
}

$(function() {
	// create floating menu object
	if(!Site.is_mobile()) {
		if($('div#intro').length > 0 || $('div.pictures').length > 0 ) {
			Site.menu = new FloatingMenu($('header'),$('header'));
		} else {
			Site.menu = new FloatingMenu($('header'),$('section').first().next());
		}
	}	
})
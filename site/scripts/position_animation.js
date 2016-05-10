
// create or use existing site scope
var Site = Site || {};

function PositionAnimation(elements) {
	var self = this;

	self.elements = Array.from(document.querySelectorAll(elements));

	/*
	 * object initialization 
	 */
	self._init = function() {
		window.addEventListener('scroll', self.scroll_event);
	};

	self.scroll_event = function(event) {
		if (self.elements.length == 0)
			return;

		// show list items
		var to_show = new Array();
		for (var element of self.elements)
			if (window.scrollY >= element.offsetTop + element.clientHeight) 
				element.classList.add('active'); else
				to_show.push(element);

		// replace item list with new one
		self.elements = to_show;
	};

	// finish object initialization
	self._init();
}

$(function() {
	Site.scroll = new PositionAnimation('ul#timeline li');
});
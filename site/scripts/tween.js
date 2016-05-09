
function Tween(target, start_value, end_value, duration) {
	var self = this;

	self._target = target;
	self._start_value = start_value;
	self._end_value = end_value;
	self._duration = duration;
	self._current_value = start_value;
	self._total_value = null;
	self._step_size = null;
	self._last_frame_time = null;

	self._init = function() {
		// pre-calculate values to minimize operations later
		self._total_value = self._end_value - self._start_value;
		self._step_size = self._total_value / self._duration;

		// initial frame time
		//Here
		self._last_frame_time = Date.now();

		// start animation
		window.requestAnimationFrame(self._callback);
	};

	self._callback = function() {
		var current_frame_time = Date.now();
		var step = self._step_size * (current_frame_time - self._last_frame_time);

		// increase value
		self._current_value += step;

		// set last frame time
		self._last_frame_time = current_frame_time;

		// set target value
		if (self._current_value < self._end_value) {
			self._target.html(Math.round(self._current_value).toLocaleString());

			// continue animation
			window.requestAnimationFrame(self._callback);

		} else {
			self._target.html(Math.round(self._end_value).toLocaleString());
		}
	};

	// finalize object
	self._init();
}

$(function() {
	if (!Site.is_mobile()) {
		var self_window = $(window);
		var is_position = true;
		var position = $('header').offset().top - 800;
		var features_links = $('div#features li.stock.feature');

		if(self_window.scrollTop() >= position && is_position) {
			is_position = false;
			features_links.each(function() {
				var self = $(this);
				var end_value = parseInt(self.find('h4').text());
				new Tween(self.find('h4'),0, end_value,3000);
			});
		}
	}
})

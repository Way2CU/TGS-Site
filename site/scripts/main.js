/**
 * Main JavaScript
 * Site Name
 *
 * Copyright (c) 2015. by Way2CU, http://way2cu.com
 * Authors:
 */

// create or use existing site scope
var Site = Site || {};

// make sure variable cache exists
Site.variable_cache = Site.variable_cache || {};


/**
 * Check if site is being displayed on mobile.
 * @return boolean
 */
Site.is_mobile = function() {
	var result = false;

	// check for cached value
	if ('mobile_version' in Site.variable_cache) {
		result = Site.variable_cache['mobile_version'];

	} else {
		// detect if site is mobile
		var elements = document.getElementsByName('viewport');

		// check all tags and find `meta`
		for (var i=0, count=elements.length; i<count; i++) {
			var tag = elements[i];

			if (tag.tagName == 'META') {
				result = true;
				break;
			}
		}

		// cache value so next time we are faster
		Site.variable_cache['mobile_version'] = result;
	}

	return result;
};

/**
 * Function called when document and images have been completely loaded.
 */
Site.on_load = function() {
	if (Site.is_mobile())
		Site.mobile_menu = new Caracal.MobileMenu();

	// function for filtering jobs
	var filter_checkboxes = $('label.job input');
	filter_checkboxes.on('change', function() {
		var id = $(this).attr('id');
		var jobs = $('article.job_preview[data-id='+id+']');
		if(this.checked == true) {
			jobs.removeClass('hidden');
		} else {
			jobs.addClass('hidden');
		}
	});

	// create dialog for job form
	Site.dialog  = new Dialog();
	Site.dialog
		.setSize(500,500)
		.setTitle(language_handler.getText(null, 'button_apply_position'))
		.setContentFromDOM('div.fixed_form');

	var submit_button = $('<a>');
	submit_button
		.attr('href', 'javascript:void(0)')
		.html(language_handler.getText(null, 'send'))
		.on('click', function(event) {
			event.preventDefault();
			Site.dialog.hide();
			Site.dialog._container.find('form').submit();
		});
	Site.dialog.addControl(submit_button);

	 //function for showing job form
	 $('a.button_apply').on('click', function() {
	 	Site.dialog.show();
	});
}
// connect document `load` event with handler function
$(Site.on_load);

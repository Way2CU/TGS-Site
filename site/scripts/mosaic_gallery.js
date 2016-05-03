$(window).load(function() {
	$('.pictures').jMosaic({
		items_type: "img", // Type of elements in the selector (Default: img);
		min_row_height: 300, // Minimal row height (Default: 150);
		margin: 1, // Space between elements (Default: 0);
		is_first_big: false // First row - largest (Default: false);
	});
});

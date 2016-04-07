$(window).load(function() {
	$('.pictures').jMosaic({
		items_type: "img", // Type of elements in the selector (Default: img);
		min_row_height: 500, // Minimal row height (Default: 150);
		margin: 3, // Space between elements (Default: 0);
		is_first_big: true // First row - largest (Default: false);
	});
});

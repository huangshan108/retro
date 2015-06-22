$(function() {
	$('#join').click(function(e) {
		url = /session/ + $('input[name="join"]').val();
		window.location.href = url;
	});
})
$(function(){
	$('button.create-new-issue').click(function(e) {
		detail = $('#new-issue').val();
		request_data = {
			'detail': detail,
			'session_id': $('#new-issue').data('session-id'),
			'user_id': $('#new-issue').data('user-id')
		}
		$.ajax({
			url: '/issues/create',
			type: 'POST',
			data: request_data,
			dataType: 'JSON',
			success: function(response) {
				appendToList(response.data.detail);
			},
			error: function(response) {
				alert("Error");
			}
		});
	});
});

function appendToList (issue) {
	$('ul').append('<li>' + issue + '</li>');
}
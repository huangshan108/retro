$(function() {
	$('body').on('click', '#submit-note', function() {
		note = $('.new-note input').val();
		$.ajax({
			url: '/issues/new-note',
			type: 'POST',
			dataType: 'JSON',
			data: {'note': note, 'issue_id': $('.new-note input').data('issue-id')},
			success: function(response) {
				$('.existing-notes ul').append('<li>' + response.data + '</li>');
			},
			error: function(response) {
				alert("Error when posting notes");
			}
		});
	});
});
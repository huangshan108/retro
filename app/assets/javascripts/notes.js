$(function() {
	$('#submit-note').click(function() {
		note = $('.new-note input').val();
		$.ajax({
			url: '/issues/new-note',
			type: 'POST',
			dataType: 'JSON',
			data: {'note': note, 'issue_id': $('.new-note input').data('issue-id')},
			success: function(response) {
				
			},
			error: function(response) {
				alert("Error when posting notes");
			}
		});
	});
});
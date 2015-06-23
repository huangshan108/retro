$(function() {
	$('.thumb-wrapper').click(function(e) {
		thumb_vote_url = ''
		issue_id = 0
		if ($(e.currentTarget).hasClass('up')) {
			thumb_vote_url = '/issues/thumb-up';
			issue_id = $(e.currentTarget).data('issue-id');
		} else {
			thumb_vote_url = '/issues/thumb-down';
			issue_id = $(e.currentTarget).data('issue-id');
		}
		$.ajax({
			url: thumb_vote_url,
			data: {
				'issue_id': issue_id, 
			},
			type: 'POST',
			dataType: 'JSON',
			success: function() {

			},
			error: function() {
				alert("Error when thumb vote.")
			}
		});
	});
});
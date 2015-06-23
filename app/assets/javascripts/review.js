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
		do_thumb_vote_ajax(thumb_vote_url, issue_id);
	});

	$('body').keypress(function(e) {
		e.preventDefault();
		issue_id = $('.thumb-wrapper.up').data('issue-id');
		// enter
		if (e.which == 13) { 
			do_thumb_vote_ajax('/issues/thumb-up', issue_id);
		// space 
		} else if (e.which == 32) {
			do_thumb_vote_ajax('/issues/thumb-down', issue_id);
		};
	});
});

function do_thumb_vote_ajax (thumb_vote_url, issue_id) {
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
}
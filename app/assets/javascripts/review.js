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

	if ($('.thumb-wrapper').length > 0) {
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

		$('body').on( "keypress", ".new-note", function(e) {
			e.stopPropagation();
		});
	};

	$('#next-issue').click(function() {
		var $current = $('tr.current');
		var cur_issue_id = $current.data('issue-id');
		var next_issue_id = $current.next().data('issue-id');
		$.ajax({
			url: '/issues/next-issue',
			type: 'GET',
			data: {
				'cur_issue_id': cur_issue_id,
				'next_issue_id': next_issue_id,
			},
			success: function(response) {
				$current.removeClass('current');
				$current.next().addClass('current');
				$('.current-issue-container').html(response);
				checkNextIssueButton();
			},
			error: function(response) {

			}
		});
	});

	checkNextIssueButton();
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
};

function checkNextIssueButton() {
	if ($('.no-more-issues').length > 0) {
		$('#next-issue').prop( "disabled", true );
	};
};
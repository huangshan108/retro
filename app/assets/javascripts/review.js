$(function() {
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

function checkNextIssueButton() {
  if ($('.no-more-issues').length > 0) {
    $('#next-issue').prop( "disabled", true );
  };
};
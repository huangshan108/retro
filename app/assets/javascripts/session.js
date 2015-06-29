$(function(){
  $('.vote input').change(function(e) {
    updateVoteCount();
  });

  $('#submit-vote').click(function(e) {
    if (parseInt($('.vote-counter span').text()) < 0) {
      alert("You can only vote at most 5 votes!");
      return false;
    };
    result = getVoteResult();
    console.log(result);
    $.ajax({
      url: '/issues/vote',
      type: 'POST',
      data: {
        'vote': result, 
        'user_id': $('#submit-vote').data('user-id'),
        'session_id': $('#submit-vote').data('session-id')
      },
      dataType: 'JSON',
      success: function(response) {

      },
      error: function(response) {
        alert("Error when submitting vote");  
      }
    });
  });
});

function updateVoteCount() {
  votes = 0
  $('.vote input').each(function(i, elem) {
    votes += parseInt($(elem).val());
  })
  $('.vote-counter span').text(5 - votes);
}

function getVoteResult() {
  result = {};
  $('.vote input').each(function(i, elem) {
    result[$(elem).data("issue-id")] = $(elem).val();
  });
  return result;
}
$(function(){
  $('.create-new-issue').click(function(e) {
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
        $('#new-issue').val("");
      },
      error: function(response) {
        alert("Error when creating new issue");
      }
    });
  });

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
      data: {'vote': result},
      dataType: 'JSON',
      success: function(response) {

      },
      error: function(response) {
        alert("Error when submitting vote");  
      }
    });
  });
});

function appendToList(issue) {
  $('ul').append('<li>' + issue + '</li>');
}

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
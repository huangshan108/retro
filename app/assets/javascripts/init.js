$(function() {
  var issue_socket = new IssueSocket();

  if ($('.thumb-graph-wrapper').length > 0) {
    var obj = {};
    obj['thumb_up'] = $('.up-count').text();
    obj['thumb_down'] = $('.down-count').text();
    issue_socket.thumbVoteCallback(obj);
  };
});
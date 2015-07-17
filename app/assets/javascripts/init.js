$(function() {
  resizeWindow();
  var issue_socket = new IssueSocket();

  if ($('.thumb-graph-wrapper').length > 0) {
    var obj = {};
    obj['thumb_up'] = $('.up-count').text();
    obj['thumb_down'] = $('.down-count').text();
    issue_socket.thumbVoteCallback(obj);
  };
});

$(window).resize(function() {
  resizeWindow();
});

function resizeWindow() {
  var $app_container = $('.app-container');
  var $window = $(window);
  if ($app_container.height() < $window.height()) {
    $app_container.height($window.height() - 48);
  };
};
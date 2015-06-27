var IssueSocket = function() {
  this.socket = new WebSocket(App.websocket_url + "session/" + this.session_id);

  this.initBinds();
};

IssueSocket.prototype.initBinds = function() {
  var _this = this;
  if ($('#new-issue-form').length > 0) {
    _this.bindNewIssue();
  };
  if ($('#new-note-form').length > 0) {
    _this.bindNewNote();
  };
  if ($('.count-down').length > 0) {
    _this.bindCountDown();
  };
  if ($('#submit-vote').length > 0) {
    _this.bindVote();
  };
  // this.new_issue_form.submit(function(e) {
  //   e.preventDefault();
  //   _this.sendIssue($('#new-issue').val());
  // });
  this.socket.onmessage = function(e) {
    console.log(e);
    var obj = unpack(e.data);
    console.log(obj);
    // _this.sendIssue();
  }
};

IssueSocket.prototype.bindNewIssue = function() {
  var _this = this;
  var $new_issue_form = $('#new-issue-form');
  $new_issue_form.submit(function(e) {
    e.preventDefault();
    console.log("submitting #new-issue-form");
    _this.sendIssue();
  });
};

IssueSocket.prototype.bindNewNote = function() {

};

IssueSocket.prototype.bindCountDown = function() {

};

IssueSocket.prototype.bindVote = function() {

};

IssueSocket.prototype.sendIssue = function() {
  var $new_issue = $('#new-issue');
  var detail = $new_issue.val();
  var session_id = $new_issue.data('session-id');
  var user_id = $new_issue.data('user-id');  
  var req = {
    'type': 'new_issue',
    'detail': detail,
    'session_id': session_id,
    'user_id': user_id,
  }
  console.log('req', req);
  this.send(req);
};

IssueSocket.prototype.sendIssue = function() {

};

IssueSocket.prototype.sendNote = function() {

};

IssueSocket.prototype.sendCountDown = function() {

};

IssueSocket.prototype.sendVote = function() {

};

IssueSocket.prototype.send = function(req) {
  this.socket.send(pack(req));
};

IssueSocket.prototype.success = function() {
  $('ul.issue-list').append('<li>' + this.detail + '</li>')
};

function pack(obj) {
  return JSON.stringify(obj);
};

function unpack(str) {
  return JSON.parse(str);
}

$(function() {
  var issue_socket = new IssueSocket();
});
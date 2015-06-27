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
  
};

IssueSocket.prototype.bindNewNote = function() {

};

IssueSocket.prototype.bindCountDown = function() {

};

IssueSocket.prototype.bindVote = function() {

};

IssueSocket.prototype.sendIssue = function(detail) {
  this.detail = detail;
  issue_obj = {
    'session_id': this.session_id,
    'user_name': this.user_name,
    'detail': this.detail
  }
  this.socket.send(pack(issue_obj));
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
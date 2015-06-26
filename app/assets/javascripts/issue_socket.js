var IssueSocket = function(session_id, user_name, new_issue_form) {
  this.session_id = session_id;
  this.user_name = user_name;
  this.new_issue_form = new_issue_form;

  this.socket = new WebSocket(App.websocket_url + "session/" + this.session_id);

  this.initBinds();
};

IssueSocket.prototype.initBinds = function() {
  var _this = this;
  this.new_issue_form.submit(function(e) {
    e.preventDefault();
    _this.sendIssue($('#new-issue').val());
  });
  this.socket.onmessage = function(e) {
    console.log(e);
    var obj = unpack(e.data);
    _this.sendIssue();
  }
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
  // return JSON.parse(str);
}
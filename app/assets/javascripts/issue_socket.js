var IssueSocket = function() {
  this.socket = new WebSocket(App.websocket_url);
  this.initBinds();
};

IssueSocket.prototype.initBinds = function() {
  var _this = this;
  _this.bindNewIssue();
  _this.bindNewNote();
  _this.bindVote();
  this.socket.onmessage = function(e) {
    var resp = unpack(e.data);
    console.log(resp);
    switch(resp.type) {
      case 'issue':
        issueCallback(resp);
        break;
      case 'note':
        noteCallback(resp);
      case 'thumb_vote':
        thumbVoteCallback(resp);
      default:
        break;
    }
  }
};

function issueCallback(resp) {
  var issue_box = '<div class="issue-box"><span>' + resp.detail + '</span></div>';
  $(issue_box).hide().prependTo(".issue-list").fadeIn("slow");
  $('#new-issue').val("");
}

function noteCallback(resp) {
  appendToList('note', resp.detail);
  $('#new-note').val("");
}

function thumbVoteCallback(resp) {
  $('.up-count').text(resp.thumb_up);
  $('.down-count').text(resp.thumb_down);
  checkCountDown(resp.up, resp.down, resp.active);
}

IssueSocket.prototype.bindNewIssue = function() {
  var _this = this;
  $('body').on('submit', '#new-issue-form', function(e) {
    e.preventDefault();
    console.log("submitting #new-issue-form");
    _this.sendIssue();
  });
};

IssueSocket.prototype.bindNewNote = function() {
  var _this = this;
  $('body').on('submit', '#new-note-form', function(e) {
    e.preventDefault();
    console.log("submitting #new-note-form");
    _this.sendNote();
  });
};

IssueSocket.prototype.bindVote = function() {
  var _this = this;
  $('body').on('keypress', 'input', function(e) {
    e.stopPropagation();
  });
  
  $('body').on('keypress', function(e) {
    e.preventDefault();
    var issue_id = $('.current-issue').data('issue-id');
    req = {
      'type': 'thumb_vote',
      'issue_id': issue_id
    }
    if (e.which == 13) { // Enter
      req['vote_type'] = 'up';
      _this.sendVote(req);
    } else if (e.which == 32) { // Space
      req['vote_type'] = 'down';
      _this.sendVote(req);
    };
  });


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
    'user_id': user_id
  }
  console.log('req', req);
  this.send(req);
};

IssueSocket.prototype.sendNote = function() {
  var $new_note = $('#new-note');
  var detail = $new_note.val();
  var issue_id = $new_note.data('issue-id');
  var req = {
    'type': 'new_note',
    'detail': detail,
    'issue_id': issue_id
  }
  console.log('req', req);
  this.send(req);
};

IssueSocket.prototype.sendVote = function(req) {
  this.send(req);
};

IssueSocket.prototype.send = function(req) {
  this.socket.send(pack(req));
};
var IssueSocket = function() {
  this.socket = new WebSocket(App.websocket_url);
  this.initBinds();
};

IssueSocket.prototype.initBinds = function() {
  var _this = this;
  _this.bindNewIssue();
  _this.bindNewNote();
  _this.bindVote();
  _this.bindPrevNextButton();
  _this.bindChangeStage();
  this.socket.onmessage = function(e) {
    var resp = unpack(e.data);
    console.log(resp);
    switch(resp.type) {
      case 'issue':
        issueCallback(resp);
        break;
      case 'note':
        noteCallback(resp);
        break;
      case 'thumb_vote':
        _this.thumbVoteCallback(resp);
        break;
      case 'reset_thumb_vote':
        count_down.extraTime(resp.sec_elapsed);
        _this.thumbVoteCallback(resp);
        break;
      case 'refresh':
        location.reload();
        break;
      default:
        // location.reload();
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
  var note_box = '<div class="note-box"><span>' + resp.detail + '</span></div>';
  $(note_box).hide().prependTo(".note-list").fadeIn("slow");
  $('#new-note').val("");
}

IssueSocket.prototype.thumbVoteCallback = function(resp) {
  var _this = this;
  if (resp.status == "failed") {
    flash('You already thumb voted!', 'error');
    return;
  } else if (resp.status == "succeed") {
    // debugger
    flash('Thumb vote succeed!', 'notice');
    var all_users = $('.thumb-table-wrapper').data('user-count');
    if (parseInt(resp.thumb_up) != 0 && parseInt(resp.thumb_up) >= parseInt(all_users) / 2) {
      _this.resetThumbVote();
      return;
    };
    $('.up-count').text(resp.thumb_up);
    $('.down-count').text(resp.thumb_down);
    $('.up-percentage').text(computeThumbVotePercentage(resp.thumb_up));
    $('.down-percentage').text(computeThumbVotePercentage(resp.thumb_down));
    $('.up-growth').height(computeThumbVoteHeight(resp.thumb_up));
    $('.down-growth').height(computeThumbVoteHeight(resp.thumb_down));
  };
}

function computeThumbVotePercentage(num) {
  var all_users = $('.thumb-table-wrapper').data('user-count');
  var perc = parseFloat(parseInt(num) / parseInt(all_users));
  return (perc * 100).toFixed(1) + "%";
}

function computeThumbVoteHeight(num) {
  var all_users = $('.thumb-table-wrapper').data('user-count');
  var max_height = $('.up-graph-wrapper').height();
  return parseInt(num) / parseInt(all_users) * max_height;
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
      'issue_id': issue_id,
      'user_id': $('.thumb-table-wrapper').data('user-id')
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

IssueSocket.prototype.bindPrevNextButton = function() {
  var _this = this;
  $('body').on('click', '#prev-issue', function(e) {
    _this.sendPrev();
  });
  $('body').on('click', '#next-issue', function(e) {
    _this.sendNext();
  });
};

IssueSocket.prototype.bindChangeStage = function() {
  var _this = this;
  $('body').on('click', '.stage-link', function(e) {
    _this.sendChangeStage($(e.currentTarget).data('stage'));
  });
}

IssueSocket.prototype.sendChangeStage = function(stage) {
  var req = {
    'type': 'change_stage',
    'session_id': $('.stages').data('session-id'),
    'stage': stage
  }
  console.log('req', req);
  this.send(req);
}

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
  };
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
  };
  console.log('req', req);
  this.send(req);
};

IssueSocket.prototype.sendVote = function(req) {
  this.send(req);
};

IssueSocket.prototype.send = function(req) {
  this.socket.send(pack(req));
};

IssueSocket.prototype.sendPrev = function(req) {
  var $current = $('.current');
  var cur_issue_id = $current.data('issue-id');
  var prev_issue_id = $current.prev().data('issue-id');
  var req = {
    'type': 'prev_issue',
    'cur_issue_id': cur_issue_id,
    'prev_issue_id': prev_issue_id
  };
  console.log('req', req);
  this.send(req);
};

IssueSocket.prototype.sendNext = function(req) {
  var $current = $('.current');
  var cur_issue_id = $current.data('issue-id');
  var next_issue_id = $current.next().data('issue-id');
  var req = {
    'type': 'next_issue',
    'cur_issue_id': cur_issue_id,
    'next_issue_id': next_issue_id
  };
  console.log('req', req);
  this.send(req);
};

IssueSocket.prototype.resetThumbVote = function() {
  var issue_id = $('.current-issue').data('issue-id');
  var req = {
    'type': 'reset_thumb_vote',
    'issue_id': issue_id
  }
  console.log('req', req);
  this.send(req);
};
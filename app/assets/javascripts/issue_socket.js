var IssueSocket = function(session_id, user_id, form) {
	this.session_id = session_id;
	this.user_id = user_id;
	this.form = form;

	this.socket = new WebStocket(App.websocket_url + "session/" + this.session_id);

	this.initBinds();
};

IssueSocket.prototype.initBinds = function() {
	var _this = this;
	this.form.submit(function(e) {
		e.preventDefault();
		_this.sendIssue($('#new-issue').val());
	});
	this.socket.onmessage = function(e) {
		var obj = unpack(e.data);
		_this.sendIssue()
	}
};

IssueSocket.prototype.sendIssue = function(detail) {
	this.detail = detail;
	issue_obj = {
		'session_id': this.session_id,
		'user_id': this.user_id,
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
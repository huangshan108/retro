module Handler
  def self.create_new_issue req
    issue = Issue.create(
      :detail => req['detail'],
      :session_id => req['session_id'],
      :user_id => req['user_id'],
      :is_current => false,
      :vote => 0,
      :thumb_up => 0,
      :thumb_down => 0
    ).as_json
    issue['type'] = 'issue'
    issue
  end

  def self.create_new_note req
    note = Note.create(
      :detail => req['detail'],
      :issue_id => req['issue_id']
    ).as_json
    note['type'] = 'note'
    note
  end

  def self.handle_thumb_vote req
    issue = Issue.find(req['issue_id'])
    if req['vote_type'] == 'up'
      issue.increment!(:thumb_up)
    else req['vote_type'] == 'down'
      issue.increment!(:thumb_down)
    end
    resp = {}
    resp['thumb_up'] = issue.thumb_up
    resp['thumb_down'] = issue.thumb_down
    resp['active'] = 2
    resp['type'] = 'thumb_vote'
    resp
  end

  def self.show_prev_issue req
    resp = {}
    @prev_issue = Issue.find_by_id(req['prev_issue_id'])
    if @prev_issue
      @prev_issue.update(:is_current => true)
      @prev_issue.init_count_down
      Issue.find_by_id(req['cur_issue_id']).update(:is_current => false)
    end
    resp['type'] = 'refresh'
    resp
  end

  def self.show_next_issue req
    resp = {}
    @next_issue = Issue.find_by_id(req['next_issue_id'])
    if @next_issue
      @next_issue.update(:is_current => true)
      @next_issue.init_count_down
      Issue.find_by_id(req['cur_issue_id']).update(:is_current => false)
    end
    resp['type'] = 'refresh'
    resp
  end

end
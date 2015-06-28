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
end
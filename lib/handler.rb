module Handler
  def self.handle_sync_time req
    resp['type' => 'sync_time']
    sec_left = Issue.find(req['issue_id']).get_sec_left()
    resp['sec_left' => sec_left]
    resp
  end

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
    issue['model'] = 'issue'
    issue
  end

  def self.create_new_note req
    note = Note.create(
      :detail => req['detail'], 
      :issue_id => req['issue_id']
    ).as_json
    note['model'] = 'note'
    note
  end
end
module Handler
  # def self.handle_sync_time req
  #   sec_elapsed = Issue.find(req['issue_id']).get_sec_elapsed
  #   resp['sec_elapsed' => sec_elapsed]
  #   resp['type'] = 'count_down'
  #   resp
  # end

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

  def self.handle_vote req

    resp['type'] = 'vote'
    resp
  end
end
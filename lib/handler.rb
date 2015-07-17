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
    resp = {}
    resp['type'] = 'thumb_vote'
    if User.find(req['user_id']).thumb_voted == true
      resp['status'] = 'failed'
      return resp
    end
    issue = Issue.find(req['issue_id'])
    if req['vote_type'] == 'up'
      issue.increment!(:thumb_up)
    else req['vote_type'] == 'down'
      issue.increment!(:thumb_down)
    end
    User.find(req['user_id']).update(thumb_voted: true)

    if issue.thumb_up != 0 and issue.thumb_up >= issue.session.users.count / 2
      issue.update(:thumb_up => 0)
      issue.update(:thumb_down => 0)
      issue.session.users.each do |user|
        user.update(thumb_voted: false)
      end
      issue.extra_time
      resp['reset'] = 'true'
    end

    resp['thumb_up'] = issue.thumb_up
    resp['thumb_down'] = issue.thumb_down
    resp['status'] = 'succeed'
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

  # def self.reset_thumb_vote req
  #   issue = Issue.find(req['issue_id'])
  #   issue.update(:thumb_up => 0)
  #   issue.update(:thumb_down => 0)
  #   issue.session.users.each do |user|
  #     user.update(thumb_voted: false)
  #   end
  #   issue.extra_time
  #   resp = {}
  #   resp['thumb_up'] = issue.thumb_up
  #   resp['thumb_down'] = issue.thumb_down
  #   resp['type'] = 'reset_thumb_vote'
  #   resp['sec_elapsed'] = issue.get_sec_elapsed
  #   resp['status'] = 'succeed'
  #   resp
  # end

  def self.change_stage req
    Session.find(req['session_id']).change_stage(req['stage'])
    resp = {}
    resp['type'] = 'refresh'
    resp
  end

end
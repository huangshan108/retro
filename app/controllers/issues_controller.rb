class IssuesController < ApplicationController
  def vote
    result = params[:vote]
    result.each do |k, v|
      cur_issue = Issue.find(k)
      cur_issue.update(:vote => cur_issue.vote + v.to_i)
    end
    User.find(params[:user_id]).set_voted
    respond_to do |format|
      format.html {}
      format.json { render :json => {:data => "succeed!" } }
    end
  end

  def get_sec_elapsed
    sec_elapsed = Issue.find(params[:cur_issue_id]).get_sec_elapsed
    respond_to do |format|
      format.html {}
      format.json { render :json => { :data => sec_elapsed } }
    end
  end
end

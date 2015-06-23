class IssuesController < ApplicationController
  def create
    issue = Issue.create(
      :detail => params[:detail], 
      :session_id => params[:session_id], 
      :user_id => params[:user_id],
      :is_current => false,
      :vote => 0
      )
      respond_to do |format|
        format.html {}
        format.json { render :json => {:data => issue }}
      end
  end

  def vote
    result = params[:vote]
    result.each do |k, v|
      cur_issue = Issue.find(k)
      cur_issue.update(:vote => cur_issue.vote + v.to_i)
    end
    respond_to do |format|
      format.html {}
      format.json { render :json => {:data => "succeed!" }}
    end
  end
end

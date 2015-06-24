class IssuesController < ApplicationController
  def create
    issue = Issue.create(
      :detail => params[:detail], 
      :session_id => params[:session_id], 
      :user_id => params[:user_id],
      :is_current => false,
      :vote => 0,
      :thumb_up => 0,
      :thumb_down => 0
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
      format.json { render :json => {:data => "succeed!" } }
    end
  end

  def thumb_up
    Issue.find(params[:issue_id]).increment!(:thumb_up)
    respond_to do |format|
      format.html {}
      format.json { render :json => {:data => "succeed!" } }
    end
  end

  def thumb_down
    Issue.find(params[:issue_id]).increment!(:thumb_down)
    respond_to do |format|
      format.html {}
      format.json { render :json => {:data => "succeed!" } }
    end
  end

  def next_issue
    @current_issue = Issue.find_by_id(params[:next_issue_id])
    if @current_issue
      @current_issue.update(:is_current => true)      
      Issue.find_by_id(params[:cur_issue_id]).update(:is_current => false)
    end
    render 'session/_current_issue.html.erb', :layout => false
  end
end

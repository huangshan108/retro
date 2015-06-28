class IssuesController < ApplicationController
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

  def next_issue
    @next_issue = Issue.find_by_id(params[:next_issue_id])
    if @next_issue
      @next_issue.update(:is_current => true)
      @next_issue.init_count_down
      Issue.find_by_id(params[:cur_issue_id]).update(:is_current => false)
    end
    @current_issue = @next_issue # for view instance var only
    render 'session/_current_issue.html.erb', :layout => false
  end

  def get_sec_elapsed
    sec_elapsed = Issue.find(params[:cur_issue_id]).get_sec_elapsed
    respond_to do |format|
      format.html {}
      format.json { render :json => { :data => sec_elapsed } }
    end
  end
end

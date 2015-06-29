class SessionController < ApplicationController
  def index
    
  end

  def create
    new_session = Session.create(:mode => :edit)
    redirect_to show_session_path(new_session)
  end

  def show
    @s = Session.find_by_id(params[:id])
    if @s == nil
      flash[:error] = "Session not found"
      redirect_to root_path
      return
    end
    if params[:name]
      @user = User.where(:name => params[:name], :session_id => params[:id]).first
      if @user
        # do some logic when user is found
      else
        @user = User.create(:name => params[:name], :session_id => params[:id])
      end
      @issues = @s.issues
      case @s.mode
      when "edit"
        render 'show'
        return
      when "vote"
        render 'vote'
        return
      when "review"
        @issues = @issues.order(vote: :desc)
        if @issues.where(:is_current => true).empty?
          @issues.first.update(:is_current => true)          
        end
        @current_issue = @issues.where(:is_current => true).first
        render 'review'
        return
      when "report"
        @issues = @issues.order(vote: :desc)
        render 'report'
        return
      end
    else
      redirect_to :action => :join, :id => params[:id]
      return
    end
  end

  def join
    if params[:name]
      redirect_to show_session_path(:id => params[:id], :name => params[:name])
      return
    end
    @s = Session.find_by_id(params[:id])
  end

  def review
    
  end

  def edit_stage
    change_stage('edit')
  end

  def vote_stage
    change_stage('vote')
  end

  def review_stage
    change_stage('review')
  end

  def report_stage
    change_stage('report')
  end

  def change_stage(stage)
    Session.find(params[:session_id]).update(:mode => stage)
    redirect_to show_session_path(:id => params[:session_id], :name => params[:name])
  end
end

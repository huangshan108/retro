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
        @issues.first.update(:is_current => true)
        @current_issue = @issues.where(:is_current => true).first
        render 'review'
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
  end

  def review
    
  end
end

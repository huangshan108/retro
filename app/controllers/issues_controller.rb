class IssuesController < ApplicationController
  def create
    issue = Issue.create(
      :detail => params[:detail], 
      :session_id => params[:session_id], 
      :user_id => params[:user_id]
      )
      respond_to do |format|
        format.html {}
        format.json { render :json => {:data => issue }}
      end
  end
end

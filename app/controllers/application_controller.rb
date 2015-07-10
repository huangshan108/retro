class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :session_id, :user_name, :user_count

  def session_id
    params[:id]
  end

  def user_name
    params[:name]
  end

  def user_count
    Session.find(session_id).users.count
  end
end

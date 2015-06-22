class SessionController < ApplicationController
	def index
		
	end

	def create
		new_session = Session.create
		redirect_to show_session_path(new_session)
	end

	def show
		if Session.find_by_id(params[:id]) == nil
			flash[:error] = "Session not found"
			redirect_to root_path
			return
		end
		if params[:name]
			s = Session.find(params[:id])
			if s.users.all.map(&:name).include? params[:name]
				# do some logic when user is found
			else
				u = User.create(:name => params[:name], :session_id => params[:id])
			end
			render 'show'
		else
			render 'join'
		end
	end

	def join
		redirect_to show_session_path(:id => params[:id], :name => params[:name])
	end
end

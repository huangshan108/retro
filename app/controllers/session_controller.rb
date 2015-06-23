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
			@s = Session.find(params[:id])
			@user = User.where(:name => params[:name], :session_id => params[:id]).first
			if @user
				# do some logic when user is found
			else
				@user = User.create(:name => params[:name], :session_id => params[:id])
			end
			@issues = @s.issues
			render 'show'
		else
			redirect_to :action => :join, :id => params[:id]
		end
	end

	def join
		if params[:name]
			redirect_to show_session_path(:id => params[:id], :name => params[:name])
			return
		end
	end
end

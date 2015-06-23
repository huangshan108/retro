class SessionController < ApplicationController
	def index
		
	end

	def create
		new_session = Session.create(:review_mode => false)
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
			if @s.review_mode
				render 'review'
				return
			end
			render 'show'
			return
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
end

class SessionController < ApplicationController
	def index
		
	end

	def create
		new_session = Session.create
		redirect_to show_session_path(new_session)
	end

	def show
		if params[:name]
			render 'show'
		else
			render 'join'
		end
	end

	def join
		redirect_to show_session_path(:id => params[:id], :name => params[:name])
	end
end

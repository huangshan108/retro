class NotesController < ApplicationController
	def create
		Note.create(:detail => params[:note], :issue_id => params[:issue_id])
		redirect_to :back
	end
end

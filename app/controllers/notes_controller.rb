class NotesController < ApplicationController
  def create
    n = Note.create(:detail => params[:note], :issue_id => params[:issue_id])
    respond_to do |format|
      format.html { }
      format.json { render :json => {:data => n.detail } }
    end
  end
end

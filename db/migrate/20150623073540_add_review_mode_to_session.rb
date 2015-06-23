class AddReviewModeToSession < ActiveRecord::Migration
  def change
  	add_column :sessions, :review_mode, :boolean, :default => false
  end
end

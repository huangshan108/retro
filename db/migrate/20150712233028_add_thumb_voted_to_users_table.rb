class AddThumbVotedToUsersTable < ActiveRecord::Migration
  def change
    add_column :users, :thumb_voted, :boolean, :default => false
  end
end

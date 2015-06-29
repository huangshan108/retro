class AddVotedColumnToUsersTable < ActiveRecord::Migration
  def change
    add_column :users, :voted, :boolean, :default => false
  end
end

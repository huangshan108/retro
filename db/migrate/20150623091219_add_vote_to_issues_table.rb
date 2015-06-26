class AddVoteToIssuesTable < ActiveRecord::Migration
  def change
    add_column :issues, :vote, :integer, :default => 0
  end
end

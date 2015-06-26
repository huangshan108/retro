class AddThumbColumnsToIssuesTable < ActiveRecord::Migration
  def change
    add_column :issues, :thumb_up, :integer, :default => 0
    add_column :issues, :thumb_down, :integer, :default => 0
  end
end

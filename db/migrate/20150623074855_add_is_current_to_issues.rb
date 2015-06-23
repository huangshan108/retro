class AddIsCurrentToIssues < ActiveRecord::Migration
  def change
  	add_column :issues, :is_current, :boolean, :default => false
  end
end

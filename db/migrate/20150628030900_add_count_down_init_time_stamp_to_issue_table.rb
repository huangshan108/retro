class AddCountDownInitTimeStampToIssueTable < ActiveRecord::Migration
  def change
    add_column :issues, :count_down_init_timestamp, :timestamp
  end
end

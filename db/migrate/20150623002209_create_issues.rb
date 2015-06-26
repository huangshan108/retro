class CreateIssues < ActiveRecord::Migration
  def change
    create_table :issues do |t|
      t.text :detail
      t.integer :user_id
      t.integer :session_id
      t.timestamps null: false
    end
  end
end

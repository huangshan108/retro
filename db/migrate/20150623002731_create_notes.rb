class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.text :detail
      t.integer :issue_id
      t.timestamps null: false
    end
  end
end

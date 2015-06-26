class AddModeToSessions < ActiveRecord::Migration
  def change
    add_column :sessions, :mode, :string, :default => :edit
  end
end

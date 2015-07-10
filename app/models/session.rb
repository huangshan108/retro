class Session < ActiveRecord::Base
  has_many :users
  has_many :issues

  def change_stage stage
    self.update(mode: stage)
  end
end

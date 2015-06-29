class User < ActiveRecord::Base
  belongs_to :session
  has_many :issues
  def set_voted
    self.update(:voted => true)
  end

  def voted?
    self.voted == true
  end
end

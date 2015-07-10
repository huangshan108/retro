class User < ActiveRecord::Base
  belongs_to :session
  has_many :issues
  def set_voted
    self.update(:voted => true)
  end

  def voted?
    self.voted == true
  end

  def is_host?
    self.is_host == true
  end
end

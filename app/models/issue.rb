class Issue < ActiveRecord::Base
  belongs_to :user
  belongs_to :session
  has_many :notes

  def init_count_down
    self.update(:count_down_init_timestamp => Time.now)
  end

  def get_sec_elapsed
    Time.now - self.count_down_init_timestamp
  end
end

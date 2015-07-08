class Issue < ActiveRecord::Base
  belongs_to :user
  belongs_to :session
  has_many :notes

  def init_count_down
    self.update(:count_down_init_timestamp => Time.now)
  end

  def extra_time
    self.increment!(:count_down_init_timestamp, 30)
  end

  def get_sec_elapsed
    if self.is_current && self.count_down_init_timestamp == nil
      init_count_down
    end
    Time.now - self.count_down_init_timestamp
  end
end

class User < ActiveRecord::Base
  belongs_to :session
  has_many :issues
end

class Issue < ActiveRecord::Base
  belongs_to :user
  belongs_to :session
  has_many :notes
end

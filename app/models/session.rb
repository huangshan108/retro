class Session < ActiveRecord::Base
	has_many :users
	has_many :issues
end

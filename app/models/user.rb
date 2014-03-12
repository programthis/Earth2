class User < ActiveRecord::Base
	has_secure_password 

	validates_presence_of :email

	has_one :newsfeed
end

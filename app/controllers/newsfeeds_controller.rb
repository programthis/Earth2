class NewsfeedsController < ApplicationController
	def create
		puts "************THIS HAPPENS"
		newsfeed[user_id] = params[current_user.id]
		newsfeed[country] = params["data"]
		newsfeed.save
	end 
end

class NewsfeedsController < ApplicationController

	def create
		newsfeed = current_user.newsfeed
		if newsfeed.nil?
			newsfeed = current_user.build_newsfeed
		end
		country = Country.find(params[:country_id])
		newsfeed.countries << country_id
		if newsfeed.save
			redirect_to root_path
		end
	end

end

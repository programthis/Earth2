class NewsfeedsController < ApplicationController

	def create
		newsfeed = current_user.newsfeed
		if newsfeed.nil?
			newsfeed = current_user.build_newsfeed
		end
		country = Country.find(params[:country_id])
		newsfeed.countries << country
		newsfeed.save

		if (current_user)
			@newsfeed = Newsfeed.find(current_user)
			gon.newsfeed = @newsfeed.countries
		end

		# respond_to do |format|
		# 	if newsfeed.save
		# 		format.html {redirect_to root_path, notice: "You have now subscribed!"}
		# 		format.js {}
		# 	else
		# 		format.html {render :index, notice: "The subscription failed."}
		# 		format.js {}
		# 	end
		# end
	end

end

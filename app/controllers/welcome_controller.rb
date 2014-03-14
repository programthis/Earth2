require 'open-uri'

class WelcomeController < ApplicationController
  def index
	@user = User.new

	if (current_user)
		@newsfeed = Newsfeed.find(current_user)
		gon.newsfeed = @newsfeed.countries
	end
	
	gon.newsfeed_path = url_for(newsfeeds_path)
	

	# gon.flags = asset_path("flags.png")

		top_articles_json = open('http://api.feedzilla.com/v1/categories/26/articles.json').read
		   gon.news = JSON.parse(top_articles_json)	
  	end

end

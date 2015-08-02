require 'open-uri'

class WelcomeController < ApplicationController
  def index
	@user = User.new
	gon.newsfeed_path = url_for(newsfeeds_path)
	
 	top_articles_data = open("http://content.guardianapis.com/search?api-key=" + ENV["GUARDIAN_KEY"] + "&section=-football,-sport").read
 	top_articles_json = JSON.parse(top_articles_data)
 	gon.news = top_articles_json["response"]["results"]
  end
end

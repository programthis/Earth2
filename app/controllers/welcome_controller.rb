require 'open-uri'

class WelcomeController < ApplicationController
  def index

	@countries = Country.all
	@capitals = Capital.all
	@user = User.new

	# @regions = Region.all

	gon.countries = @countries
	gon.capitals = @capitals

	# gon.flags = asset_path("flags.png")

		# top_articles_json = open('http://api.feedzilla.com/v1/categories/26/articles.json').read
		#    gon.news = JSON.parse(top_articles_json)	
# gon.regions = @regions
  	end

end

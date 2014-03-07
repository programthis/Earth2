require 'open-uri'

class WelcomeController < ApplicationController
  def index

	@countries = Country.all
	@cities = City.all
	@regions = Region.all

	gon.countries = @countries

	top_articles_json = open('http://api.feedzilla.com/v1/categories/26/articles.json').read
	   gon.news = JSON.parse(top_articles_json)

	# using Bing API to get news based on country
	# gon.bing = RBing.new("7DkdEuUKwIAzix/CqNuIqXdJ1joqegBN+BmPUQ3NHZU")

	# rsp = bing.web("Jenna Quint")
	# puts "*********************************"
	# puts rsp.results[0].title

	# gon.cities = @cities
	# gon.regions = @regions
  end


end

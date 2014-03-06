class WelcomeController < ApplicationController
  def index

	@countries = Country.all
	@cities = City.all
	@regions = Region.all

	gon.countries = @countries

	# using Bing API to get news based on country
	# gon.bing = RBing.new("7DkdEuUKwIAzix/CqNuIqXdJ1joqegBN+BmPUQ3NHZU")

	# rsp = bing.web("Jenna Quint")
	# puts "*********************************"
	# puts rsp.results[0].title

	# gon.cities = @cities
	# gon.regions = @regions
  end


end

class WelcomeController < ApplicationController
  def index

	@countries = Country.all
	@cities = City.all
	@regions = Region.all

	gon.countries = @countries
	# gon.cities = @cities
	gon.regions = @regions
  end


end

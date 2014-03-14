class CountriesController < ApplicationController
	def index
		@countries = Country.all
		respond_to do |format|
			format.json {
				render json: @countries.to_json(only: [:id, :name, :latitude, :longitude])
			}
		end
	end
end

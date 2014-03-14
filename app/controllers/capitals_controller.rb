class CapitalsController < ApplicationController
	def index
		@capitals = Capital.all
		respond_to do |format|
			format.json {
				render json: @capitals.to_json(only: [:id, :name, :latitude, :longitude])
			}
		end
	end
end

namespace :countries do
	desc "set latitude and longtitude for countries"
	task update_coordinates: :environment do
		countries = Country.where(longitude: nil, latitude: nil)
		countries.each do |country|
			country.geocode
			country.save
		end
	end
end
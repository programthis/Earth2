namespace :cities do
	desc "set capital status for all of the cities"
	task update_capital_status: :environment do
		cities = City.all
		countries = Country.all
		cities.each do |city|
			city_id = city.country_id
			countries.each do |country|
				country_id = country.id
				country_capital = country.capital.strip
				puts "********************* country id: #{country_id} city id: #{city_id}"
				city_name = city.name.strip

				puts "********************* country capital: #{country_capital} city name: #{city_name}"

				# need to match the city's ID with country ID as well
				if country_capital == city_name && city_id == country_id
					city.capital = "yes"
				else
					city.capital = "no"
				end
			end
			city.save
		end
	end
end
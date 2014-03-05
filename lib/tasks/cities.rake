namespace :cities do
	desc "set capital status for all of the cities"
	task update_capital_status: :environment do
		cities = City.all
		countries = Country.all
		cities.each do |city|
			countries.each do |country|
				if country.capital.strip == city.name.strip
					city.capital = "yes"
				else
					city.capital = "no"
				end
			end
			city.save
		end
	end
end
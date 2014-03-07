namespace :capitals do
	desc "set capital names and latitude and longtitude"
	task update_capital_names: :environment do
		countries = Country.all
		countries.each do |country|
			capital = Capital.new
			capital.name = country.capital
			capital.save
			capital.geocode
			capital.save
		end
	end
end
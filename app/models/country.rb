class Country < ActiveRecord::Base
	geocoded_by :name
	has_many :cities
end

class Country < ActiveRecord::Base
	geocoded_by :name

end

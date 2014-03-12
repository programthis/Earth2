class Country < ActiveRecord::Base
	geocoded_by :name
	has_many :cities
	has_and_belongs_to_many :newsfeeds
	has_many :users, through: :newsfeeds
end

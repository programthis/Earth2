class AddLatitudeAndLongitudeToCountries < ActiveRecord::Migration[5.0]
  def change
    add_column :countries, :latitude, :float
    add_column :countries, :longitude, :float
  end
end

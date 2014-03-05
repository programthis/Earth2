class AddCapitalColumnToCities < ActiveRecord::Migration
  def change
  	add_column :cities, :capital, :string
  end
end

class AddCapitalColumnToCities < ActiveRecord::Migration[5.0]
  def change
  	add_column :cities, :capital, :string
  end
end

class Newsfeedtable < ActiveRecord::Migration[5.0]
  def change
  	add_column :newsfeeds, :user_id, :integer 
  	add_column :newsfeeds, :country, :string  
  end
end

class Newsfeedtable < ActiveRecord::Migration
  def change
  	add_column :newsfeeds, :user_id, :integer 
  	add_column :newsfeeds, :country, :string  
  end
end

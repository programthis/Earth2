class CreateCountriesNewsFeeds < ActiveRecord::Migration[5.0]
  def change
    create_table :countries_newsfeeds, id: false do |t|
    	t.integer :newsfeed_id
    	t.integer :country_id
    end
  end
end

class RemoveColumnFromNewsFeeds < ActiveRecord::Migration[5.0]
  def change
  	remove_column :newsfeeds, :country, :string
  end
end

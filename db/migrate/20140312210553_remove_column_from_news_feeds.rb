class RemoveColumnFromNewsFeeds < ActiveRecord::Migration
  def change
  	remove_column :newsfeeds, :country, :string
  end
end

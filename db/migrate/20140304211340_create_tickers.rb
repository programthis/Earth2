class CreateTickers < ActiveRecord::Migration[5.0]
  def change
    create_table :tickers do |t|

      t.timestamps
    end
  end
end

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140319022408) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "capitals", id: :serial, force: :cascade do |t|
    t.string "name"
    t.float "latitude"
    t.float "longitude"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "countries", id: :bigint, default: -> { "nextval('\"countries_CountryId_seq\"'::regclass)" }, force: :cascade do |t|
    t.string "name", limit: 50, null: false
    t.string "fips104", limit: 2, null: false
    t.string "iso2", limit: 2, null: false
    t.string "iso3", limit: 3, null: false
    t.string "ison", limit: 4, null: false
    t.string "internet", limit: 2, null: false
    t.string "capital", limit: 25
    t.string "map_reference", limit: 50
    t.string "nationality_singular", limit: 35
    t.string "nationality_plural", limit: 35
    t.string "currency", limit: 30
    t.string "currency_code", limit: 3
    t.integer "population"
    t.string "title", limit: 50
    t.string "comment", limit: 255
    t.float "latitude"
    t.float "longitude"
    t.index ["name"], name: "index_countries_on_name"
  end

  create_table "countries_newsfeeds", id: false, force: :cascade do |t|
    t.integer "newsfeed_id"
    t.integer "country_id"
  end

  create_table "locations", id: :serial, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "newsfeeds", id: :serial, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id"
  end

  create_table "regions", id: :bigint, default: -> { "nextval('\"regions_RegionId_seq\"'::regclass)" }, force: :cascade do |t|
    t.integer "country_id", null: false
    t.string "name", limit: 45, null: false
    t.string "code", limit: 8, null: false
    t.string "adm1code", limit: 4, null: false
    t.index ["country_id"], name: "index_regions_on_country_id"
    t.index ["name"], name: "index_regions_on_name"
  end

  create_table "tickers", id: :serial, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", id: :serial, force: :cascade do |t|
    t.string "email"
    t.string "name"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "regions", "countries"
end

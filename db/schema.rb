# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20140307222559) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "capitals", force: true do |t|
    t.string   "name"
    t.float    "latitude"
    t.float    "longitude"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "cities", force: true do |t|
    t.integer "country_id",            null: false
    t.integer "region_id",             null: false
    t.string  "name",       limit: 45, null: false
    t.float   "latitude",              null: false
    t.float   "longitude",             null: false
    t.string  "timezone",   limit: 10, null: false
    t.integer "dma_id"
    t.string  "code",       limit: 4
    t.string  "capital"
  end

  add_index "cities", ["name"], name: "index_cities_on_name", using: :btree

  create_table "countries", force: true do |t|
    t.string  "name",                 limit: 50, null: false
    t.string  "fips104",              limit: 2,  null: false
    t.string  "iso2",                 limit: 2,  null: false
    t.string  "iso3",                 limit: 3,  null: false
    t.string  "ison",                 limit: 4,  null: false
    t.string  "internet",             limit: 2,  null: false
    t.string  "capital",              limit: 25
    t.string  "map_reference",        limit: 50
    t.string  "nationality_singular", limit: 35
    t.string  "nationality_plural",   limit: 35
    t.string  "currency",             limit: 30
    t.string  "currency_code",        limit: 3
    t.integer "population"
    t.string  "title",                limit: 50
    t.string  "comment"
    t.float   "latitude"
    t.float   "longitude"
  end

  add_index "countries", ["name"], name: "index_countries_on_name", using: :btree

  create_table "locations", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "regions", force: true do |t|
    t.integer "country_id",            null: false
    t.string  "name",       limit: 45, null: false
    t.string  "code",       limit: 8,  null: false
    t.string  "adm1code",   limit: 4,  null: false
  end

  add_index "regions", ["name"], name: "index_regions_on_name", using: :btree

  create_table "tickers", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "email"
    t.string   "name"
    t.string   "password_digest"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_foreign_key "cities", "countries", name: "cities_country_id_fk", dependent: :delete
  add_foreign_key "cities", "regions", name: "cities_region_id_fk", dependent: :delete

  add_foreign_key "regions", "countries", name: "regions_country_id_fk", dependent: :delete

end

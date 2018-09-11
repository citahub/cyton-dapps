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

ActiveRecord::Schema.define(version: 2018_09_11_041009) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "banners", force: :cascade do |t|
    t.string "image_url"
    t.string "address"
    t.datetime "start_at"
    t.datetime "end_at"
    t.decimal "ios_version"
    t.decimal "android_version"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "dapp_types", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_dapp_types_on_name", unique: true
  end

  create_table "dapps", force: :cascade do |t|
    t.string "logo_url"
    t.string "name"
    t.string "url_address"
    t.integer "d_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "marketing_url"
    t.text "desc"
    t.datetime "start_at"
    t.datetime "end_at"
    t.decimal "ios_version"
    t.decimal "android_version"
    t.integer "score"
    t.text "intro"
    t.datetime "publish_at"
    t.string "developer"
    t.bigint "dapp_type_id"
    t.index ["dapp_type_id"], name: "index_dapps_on_dapp_type_id"
  end

end

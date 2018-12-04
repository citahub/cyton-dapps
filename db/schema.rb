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

ActiveRecord::Schema.define(version: 2018_12_04_040050) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "banners", force: :cascade do |t|
    t.string "image_url"
    t.string "address"
    t.datetime "start_at"
    t.datetime "end_at"
    t.string "ios_version"
    t.string "android_version"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "ios_version_number"
    t.bigint "android_version_number"
  end

  create_table "dapp_translations", force: :cascade do |t|
    t.integer "dapp_id", null: false
    t.string "locale", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.text "intro"
    t.text "desc"
    t.index ["dapp_id"], name: "index_dapp_translations_on_dapp_id"
    t.index ["locale"], name: "index_dapp_translations_on_locale"
  end

  create_table "dapp_types", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_dapp_types_on_name", unique: true
  end

  create_table "dapps", force: :cascade do |t|
    t.string "logo_url"
    t.string "url_address"
    t.integer "d_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "marketing_url"
    t.datetime "start_at"
    t.datetime "end_at"
    t.string "ios_version"
    t.string "android_version"
    t.integer "score"
    t.datetime "publish_at"
    t.string "developer"
    t.bigint "dapp_type_id"
    t.bigint "ios_version_number"
    t.bigint "android_version_number"
    t.boolean "filter_ip", default: false
    t.index ["dapp_type_id"], name: "index_dapps_on_dapp_type_id"
  end

  create_table "images", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end

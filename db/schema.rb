# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_12_10_075703) do
  create_table "posts", charset: "utf8mb3", force: :cascade do |t|
    t.string "project_name"
    t.string "sub_task_name_1"
    t.string "sub_task_name_2"
    t.string "sub_task_name_3"
    t.string "sub_task_name_4"
    t.string "sub_task_name_5"
    t.text "task_detail_1"
    t.text "task_detail_2"
    t.text "task_detail_3"
    t.text "task_detail_4"
    t.text "task_detail_5"
    t.integer "hours_1"
    t.integer "hours_2"
    t.integer "hours_3"
    t.integer "hours_4"
    t.integer "hours_5"
    t.integer "minutes_1"
    t.integer "minutes_2"
    t.integer "minutes_3"
    t.integer "minutes_4"
    t.integer "minutes_5"
    t.integer "seconds_1"
    t.integer "seconds_2"
    t.integer "seconds_3"
    t.integer "seconds_4"
    t.integer "seconds_5"
    t.string "url_1"
    t.string "url_2"
    t.string "url_3"
    t.string "url_4"
    t.string "url_5"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", charset: "utf8mb3", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "nickname"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end

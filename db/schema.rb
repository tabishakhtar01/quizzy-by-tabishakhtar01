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

ActiveRecord::Schema.define(version: 2021_06_23_072541) do

  create_table "attempt_answers", force: :cascade do |t|
    t.string "answer", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "question_id"
    t.integer "attempt_id"
  end

  create_table "attempts", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "submitted"
    t.integer "quiz_id"
    t.string "slug_data"
    t.integer "user_id"
  end

  create_table "options", force: :cascade do |t|
    t.string "answer"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "question_id"
    t.string "correct_answer_id"
  end

  create_table "questions", force: :cascade do |t|
    t.text "question"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "correct_answer"
    t.integer "quiz_id"
    t.string "slug_data"
  end

  create_table "quizzes", force: :cascade do |t|
    t.text "title", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "slug", null: false
    t.index ["slug"], name: "index_quizzes_on_slug", unique: true
  end

  create_table "reports", force: :cascade do |t|
    t.string "quiz_name", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "email", null: false
    t.integer "correct", null: false
    t.integer "incorrect", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "quiz_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "email", null: false
    t.integer "role", default: 0, null: false
    t.string "password_digest", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "attempt_answers", "attempts", on_delete: :cascade
  add_foreign_key "attempt_answers", "questions", on_delete: :cascade
  add_foreign_key "attempts", "quizzes", on_delete: :cascade
  add_foreign_key "options", "questions", on_delete: :cascade
  add_foreign_key "questions", "quizzes", on_delete: :cascade
  add_foreign_key "reports", "quizzes", on_delete: :cascade
end

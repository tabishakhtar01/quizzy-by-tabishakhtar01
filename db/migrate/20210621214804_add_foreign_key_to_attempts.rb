class AddForeignKeyToAttempts < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :attempts, :quizzes, column: :quiz_id, on_delete: :cascade
  end
end

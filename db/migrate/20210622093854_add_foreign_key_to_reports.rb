class AddForeignKeyToReports < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :reports, :quizzes, column: :quiz_id, on_delete: :cascade
  end
end

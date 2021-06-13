class AddForeignKeyToOptions < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :options, :questions, column: :question_id, on_delete: :cascade
  end
end

class AddAttemptIdAndQuestionIdToAttemptAnswers < ActiveRecord::Migration[6.1]
  def change
    add_column :attempt_answers, :question_id, :integer
    add_column :attempt_answers, :attempt_id, :integer
    add_foreign_key :attempt_answers, :questions, column: :question_id, on_delete: :cascade
    add_foreign_key :attempt_answers, :attempts, column: :attempt_id, on_delete: :cascade
  end
end

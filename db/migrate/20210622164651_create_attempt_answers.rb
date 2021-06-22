class CreateAttemptAnswers < ActiveRecord::Migration[6.1]
  def change
    create_table :attempt_answers do |t|
      t.string :answer, null: false
      t.timestamps
    end
  end
end

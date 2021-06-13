class AddCorrectAnswerIdToOptions < ActiveRecord::Migration[6.1]
  def change
    add_column :options, :correct_answer_id, :string
  end
end

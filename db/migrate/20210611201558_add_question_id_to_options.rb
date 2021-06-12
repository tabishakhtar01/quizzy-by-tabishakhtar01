class AddQuestionIdToOptions < ActiveRecord::Migration[6.1]
  def change
    add_column :options, :question_id, :integer
  end
end

class AddQuizIdToQuestions < ActiveRecord::Migration[6.1]
  def change
    add_column :questions, :quiz_id, :integer
  end
end

class AddQuizIdToAttempts < ActiveRecord::Migration[6.1]
  def change
    add_column :attempts, :quiz_id, :integer
  end
end

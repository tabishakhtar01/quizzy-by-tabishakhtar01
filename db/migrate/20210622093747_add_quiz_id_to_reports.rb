class AddQuizIdToReports < ActiveRecord::Migration[6.1]
  def change
    add_column :reports, :quiz_id, :integer
  end
end

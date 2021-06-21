class AddSlugDataToQuestions < ActiveRecord::Migration[6.1]
  def change
    add_column :questions, :slug_data, :string
  end
end

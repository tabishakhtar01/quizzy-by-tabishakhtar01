class AddSlugDataToAttempts < ActiveRecord::Migration[6.1]
  def change
    add_column :attempts, :slug_data, :string
  end
end

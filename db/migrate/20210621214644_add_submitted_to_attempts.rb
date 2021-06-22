class AddSubmittedToAttempts < ActiveRecord::Migration[6.1]
  def change
    add_column :attempts, :submitted, :boolean
  end
end

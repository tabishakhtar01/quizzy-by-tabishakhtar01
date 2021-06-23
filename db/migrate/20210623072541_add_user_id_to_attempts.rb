class AddUserIdToAttempts < ActiveRecord::Migration[6.1]
  def change
    add_column :attempts, :user_id, :integer
  end
end

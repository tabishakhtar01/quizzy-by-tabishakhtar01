class CreateAttempts < ActiveRecord::Migration[6.1]
  def change
    create_table :attempts do |t|

      t.timestamps
    end
  end
end

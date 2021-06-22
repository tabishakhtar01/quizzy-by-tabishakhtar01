class CreateReports < ActiveRecord::Migration[6.1]
  def change
    create_table :reports do |t|
      t.string :quiz_name, null: false
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :email, null: false
      t.integer :correct, null: false
      t.integer :incorrect, null: false
      t.timestamps
    end
  end
end

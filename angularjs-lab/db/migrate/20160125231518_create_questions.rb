class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.text :ask

      t.timestamps null: false
    end
  end
end

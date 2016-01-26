class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.text :reply

      t.timestamps null: false

      t.integer :question_id
    end
  end
end

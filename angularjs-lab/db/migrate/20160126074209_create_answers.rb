class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|

      t.timestamps null: false
      t.text :answer
      t.references :question, index: true
    end
    add_foreign_key :answers, :questions
  end
end

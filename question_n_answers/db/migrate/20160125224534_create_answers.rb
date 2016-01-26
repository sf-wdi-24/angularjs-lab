class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.string :body
      t.timestamps null: false

      t.belongs_to :question
    end
  end
end

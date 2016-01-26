class AddColumnToQuestions < ActiveRecord::Migration
  def change
    add_column :questions, :title, :string
    add_column :questions, :description, :text
    remove_column :questions, :question, :text
  end
end

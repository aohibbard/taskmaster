class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.string :title
      t.date :due_date
      t.boolean :complete
      t.boolean :urgency
      t.text :description
      t.belongs_to :team, null: false, foreign_key: true

      t.timestamps
    end
  end
end

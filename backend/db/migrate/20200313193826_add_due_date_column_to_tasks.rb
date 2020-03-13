class AddDueDateColumnToTasks < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :due_date, :integer
  end
end

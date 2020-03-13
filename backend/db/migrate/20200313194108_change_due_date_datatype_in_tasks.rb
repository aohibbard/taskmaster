class ChangeDueDateDatatypeInTasks < ActiveRecord::Migration[6.0]
  def change
    change_column :tasks, :due_date, :string
  end
end

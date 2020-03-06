class TaskSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :title, :due_date, :urgency, :description, :created_at
  belongs_to :team
  # foreign key?
end

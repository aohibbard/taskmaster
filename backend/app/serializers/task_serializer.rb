class TaskSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :title, :due_date, :urgency, :complete, :description, :created_at, :team_id
  belongs_to :team
  # foreign key?
end

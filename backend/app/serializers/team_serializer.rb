class TeamSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :tasks
  # tasks may be wrong. check it
end

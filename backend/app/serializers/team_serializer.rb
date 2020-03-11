class TeamSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :slug, :tasks
  # tasks may be wrong. check it
end

class User < ApplicationRecord
    belongs_to :team
    # or is this has_and_belongs_to_many :teams
    has_many :tasks, through: :team
end

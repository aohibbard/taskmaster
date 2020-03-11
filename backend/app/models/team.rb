class Team < ApplicationRecord
    has_many :tasks 
    has_many :users
    
    extend FriendlyId
    friendly_id :name, use: :slugged
end

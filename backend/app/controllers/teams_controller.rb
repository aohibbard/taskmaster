class TeamsController < ApplicationController

    def index 
        teams = Team.all 
        render json: TeamSerializer.new(teams)
    end 

    def new 
    end 

    def create 
        team = Team.create(name: params[:name])
        render json: team
    end 

    def show  
        team = Team.find_by(id: params[:id])
        #team = Team.find_by(name: params[:name])
        render json: TrainerSerializer.new(team)
    end 

end

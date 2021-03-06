class TeamsController < ApplicationController

    def index 
        teams = Team.all 
        render json: TeamSerializer.new(teams)
    end 

    def new 
    end 

    def create 
        team = Team.create(name: params[:name])
        render json: TeamSerializer.new(team)
    end 

    def show  
        # team = Team.friendly.find(params[:id])
        team = Team.find(params[:id])
        render json: TeamSerializer.new(team)
    end 

end

class TasksController < ApplicationController

    def index 
        tasks = Task.all 
        render json: TaskSerializer.new(tasks)
    end 

    # def new 
    # end 

    def create
        task = Team.find_by(id: params[:id])
        team.tasks.create(title: params[:title], due_date: params[:due_date], urgency: params[:urgency], description: params[:description])
        render json: team.tasks.last
        # strong params?
    end

    def show 
        task = Task.find_by(id: params[:id])
        render json: TaskSerializer.new(task)
    end 

    def edit 
    end 

    def update 
    end 

    def destroy 
        task = Task.find_by(id: params[:id])
        task.destroy
    end 

end

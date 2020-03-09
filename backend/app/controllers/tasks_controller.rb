class TasksController < ApplicationController

    def index 
        tasks = Task.all 
        render json: TaskSerializer.new(tasks)
    end 

    # def new 
    # end 

    def create
        # REFACTOR THIS WHOLE THING TO PASS IN A TEAM! should be 
        # team = team.find_by(id: params[:id])
        # team.tasks.create ... 
        # render json: team.tasks.last
        task = Task.create(title: params[:title], due_date: params[:due_date], urgency: params[:urgency], description: params[:description], team_id: params[:team_id])
        render json: task
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

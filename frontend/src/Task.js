//object instances

class Task {
    constuctor({title, due_date, urgency, description, team_id}){
        this.title = title,
        this.due_date = due_date
        this.urgency = urgency,
        this.description = description
        this.team_id = team_id
        //this.created_at = created_at 
    }

    tasks(){
        return Task.all.filter(function(team){
            return task.team_id === this.id
        }, this)
    }

    //render
}
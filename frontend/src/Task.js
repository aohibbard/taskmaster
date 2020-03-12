//object instances

class Task {

    static all = [];

    constructor({id, title, due_date, urgency, description, team_id}){
        this.id = id
        this.title = title,
        this.dueDate = due_date,
        this.urgency = urgency,
        this.description = description,
        this.teamId = team_id
        //this.created_at = created_at 
        Task.all.push(this)
    }

    //render
}
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

    createIndividualTask(task){
        //do some magic to parse due_date
        return `<div class="task" task-data-id="${this.task.id}">
            <li>${this.task.title}</li>
            <li>Due: ${task.due_date}</li>
            <li>Urgency: ${this.task.urgent}</li>
            <li>Notes: ${this.task.description}<li>
            <button class="complete" data-id="${this.task.id}">Complete?</button>
            <button class="delete-tasks" data-id="${this.task.id}">Delete</button>
            <br>
        </div><br>` ; 
}
//object instances

class Task {

    static all = [];

    constructor({id, title, due_date, complete, urgency, description, created_at, team_id}){
        this.id = id
        this.title = title,
        this.dueDate = due_date,
        this.complete = complete,
        this.urgency = urgency,
        this.description = description,
        this.createdAt = created_at,
        this.teamId = team_id
        Task.all.push(this)
    }

    updateAllTasks(){
        const taskField = document.getElementById("task-field")
        let targetTeamId = this.teamId;
        let teamTasks = Task.all.filter(task => task.teamId === targetTeamId)
        let taskArr = ''
        for (const task of teamTasks){
            taskArr += task.createTaskForDom()
        }
        //taskArr sort
        taskField.innerHTML = taskArr;
        document.querySelectorAll(".complete").forEach(btn => btn.addEventListener("click", completeStatus));
        document.querySelectorAll(".delete-tasks").forEach(btn => btn.addEventListener("click", removeTask));
    }

    createTaskForDom(){
        if (!this.complete) {
        return `<div class="task" data-id="${this.id}">
            <h4>${this.title}</h4>
            <p>Due: due Date here</p>
            <p>Notes: ${this.description}<p>
            <button class="complete" data-id="${this.id}">Complete?</button>
            <button class="delete-tasks" data-id="${this.id}">Delete</button>
            <br>
            </div><br>` ; 
        } else {
            return `<div class="task" task-id="${this.id}">
            <h4>${this.title}</h4>
            <p>Due: due Date here</p>
            <p>Notes: ${this.description}<p>
            <button class="delete-tasks" data-id="${this.id}">Delete</button>
            <br>
            </div><br>`
        }
    };

    //set task status

}
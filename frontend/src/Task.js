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

    createTaskForDom(){
        let dueOn = parseInt(this.dueDate)
        let dateToS = new Date(dueOn)
        let showDate = String(dateToS).replace("00:00:00 GMT-0400", "")
        //show date obvi needs better functionality


        if (!this.complete && !this.urgency) {
        return `<div class="task" id="task-${this.id}" data-id="${this.id}" style="background-color:white" draggable='true' ondragstart="onDragStart(event)">
            <h4>${this.title}</h4>
            <p>Due: ${showDate}</p>
            <p>Notes: ${this.description}<p>
            <p><button class="complete" data-id="${this.id}">Complete</button>   <button class="delete-tasks" data-id="${this.id}">Delete</button></p>
            <br>
            </div><br>` ; 
        } else if (!this.complete && !!this.urgency) {
            return `<div class="task" id="task-${this.id}" task-data-id="${this.id}" style="background-color:lemonchiffon" draggable='true' ondragstart='onDragStart(event);'>
            <h4>${this.title}</h4>
            <p>Due: ${showDate} </p>
            <p>Notes: ${this.description}<p>
            <button class="complete" data-id="${this.id}">Complete?</button>
            <button class="delete-tasks" data-id="${this.id}">Delete</button>
            <br>
            </div><br>` ;
        } else {
            return `<div class="task" id="task-${this.id}" data-id="${this.id}" style="background-color:white" draggable='true' ondragstart='onDragStart(event);'>
            <h4>${this.title}</h4>
            <p>Due: ${showDate}</p>
            <p>Notes: ${this.description}<p>
            <button class="delete-tasks" data-id="${this.id}">Delete</button>
            <br>
            </div><br>`
        }
    };
    
    //doing duplicate work. needs to be changed.
    updateAllTasks(){
        const taskField = document.getElementById("task-field")
        let targetTeamId = this.teamId;
        // let teamTasks = Task.all.filter(task => task.teamId === targetTeamId)
        let teamTasks = Task.all.filter(task => task.teamId === targetTeamId).sort(function(a, b){return a.urgency - b.urgency}).sort(function(a, b){return a.dueDate - b.dueDate}).sort(function(a, b){return a.complete - b.complete})
        let taskArr = ''
        // d
        for (const task of teamTasks){
            taskArr += task.createTaskForDom()
        }
        taskField.innerHTML = taskArr;
        document.querySelectorAll(".complete").forEach(btn => btn.addEventListener("click", completeStatus));
        document.querySelectorAll(".delete-tasks").forEach(btn => btn.addEventListener("click", removeTask));
    }

    set taskComplete(status=true){
        this.complete = status;
    }

    // // DRAG EVENT LISTENERS
    // const element = document.querySelectorAll('.task')
    // element.addEventListener("dragstart", onDragStart);

    // // DRAG FUNCTIONS
    // onDragStart(event){
    //     console.log('drag start')
    //     event
    //         .dataTransfer
    //         .setData('text/plain', event.target.id);
        
    //     event
    //         .currentTarget
    //         .style
    // }

    // onDragOver(event) {
    //     event.preventDefault();
    // }

    // onDrop(event) {
    //     const id = event
    //       .dataTransfer
    //       .getData('text');

    //     const draggableElement = document.getElementById(id);
    //     const dropzone = event.target;
    //     debugger
    //     dropzone.appendChild(draggableElement);
      
    //     event
    //       .dataTransfer
    //       .clearData();
    // }
}
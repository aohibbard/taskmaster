class Team{

    static all = [];

    constructor({id, name, slug, tasks}){
        this.id = id,
        this.name = name;
        this.slug = slug;
        this.tasks = tasks;
        Team.all.push(this)
    }

    renderTeam(){
        const teamField = document.querySelector('#team-container')
        // div creates a drag zone and event handlers for dragging task divs
        teamField.innerHTML = `<div class="team-display" data-id="${this.id}">
            <h2>${this.name}</h2>
    
            <h4>Our Tasks</h2>
            <button type="button" id="add-task">Add Task</button><br>
            <div
                class="team-tasks-${this.id}"
                id="task-field" data-id="${this.id}"
                draggable="true"
                ondragover='onDragOver(event);'
                ondrop='dropHandler(event)'
                >
            </div>
        </div>`
        // document.getElementById("load-tasks").addEventListener("click", createTaskField)
        document.getElementById("add-task").addEventListener("click", toggleAddTask)
    }

}
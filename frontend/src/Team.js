class Team{

    static all = [];

    constructor({id, name, slug}){
        this.id = id,
        this.name = name;
        this.slug = slug;
       // this.tasks = []

        Team.all.push(this)
    }

    renderTeam(){
        const teamField = document.querySelector('#team-container')
        debugger
        //let teamTasks = team.tasks.forEach(createTaskField);    
        teamField.innerHTML = `<div class="team-display" data-id="${this.id}">
            <h2>${this.name}</h2>
    
            <h4>Our Tasks</h2>
            <button id="load-tasks">Refresh Tasks</button>
            <div class="team-tasks-${this.id}" id="task-field" data-id="${this.id}">
            </div>
        </div>`
        document.getElementById("load-tasks").addEventListener("click", createTaskField)
    }
}
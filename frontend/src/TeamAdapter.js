class TeamAdapter{

    constructor(baseURL){
        this.baseURL = baseURL
    }

    fetchTeams(){
        fetch(this.baseURL)
        .then(res => res.json())
        .then(teams => {
            teams.data.forEach(obj => {
                let parsed = {id: obj.id, ...obj.attributes}
                new Team(parsed)
            })
        })
        .then(() => console.log(Team.all))
    }

    createNewTeam(teamObj){
        const newTeamForm = document.querySelector('#add-team-form')

        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(teamObj)
        };
        fetch(this.baseURL, configObj)
        .then(res => res.json())
        .then(team => renderTeam(team))
        .then(newTeamForm.style.display = "none")
    }

    renderTeam(team){
        const teamField = document.querySelector('#team-container')
    
        //let teamTasks = team.tasks.forEach(createTaskField);    
        teamField.innerHTML = `<div class="team-display" data-id="${this.team.id}">
            <h2>${this.team.name}</h2>
    
            <h4>Our Tasks</h2>
            <button id="load-tasks">Refresh Tasks</button>
            <div class="team-tasks-${this.team.id}" id="task-field" data-id="${this.team.id}">
            </div>
        </div>`
        //document.getElementById("load-tasks").addEventListener("click", createTaskField)
    }

    fetchGivenTeam(slug){
        const teamsURL = "http://localhost:3000/teams/";
        fetch(this.baseURL + "/" + slug)
        .then(res => res.json())
        .then(team => {
            let parsed = {id: team.data.id, ...team.data.attributes}
            let teamObj = new Team(parsed)
            teamObj.renderTeam()
            // Team.renderTeam(teamObj)
            //teamObj.renderTeam()
            //teamsAdapter.renderTeam(teamObj);
        })
    }

    createTaskField(e){
    
        const taskField = document.querySelector("#task-field");
        let targetTeamId = parseInt(e.target.parentNode.dataset.id);
        //let targetTeam = Team.all.find(team => team.id === targetTeamId);
    
        let teamTasksArr = Task.all.filter(task => task.teamId === targetTeamId)
        let teamTasks = '';
    
        for (const task of teamTasksArr){
            teamTasks += tasksAdapter.createIndividualTask(task)
        };
    
        taskField.innerHTML += teamTasks;
        
        document.querySelectorAll(".delete-tasks").forEach(() => addEventListener("click", removeTask));
    }

}
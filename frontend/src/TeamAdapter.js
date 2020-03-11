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

    static fetchGivenTeam(slug){
        const teamsURL = "http://localhost:3000/teams/";

        fetch(teamsURL + slug)
        .then(res => res.json())
        .then(team => {
            let parsed = {id: team.data.id, ...team.data.attributes}
            let teamObj = new Team(parsed)
            teamObj.tasks.push(team.data.attributes.tasks)
            renderTeam(teamObj)
        })
        //.then(() => console.log(this.team))
        //.then(() => renderTeam(team))
    }

    renderTeam(){
        const teamField = document.querySelector('#team-container')
        let teamTasks = createTaskField(this.team.tasks)
        teamField.innerHTML += `<div class="team-display" data-id="${this.team.id}">
            <h2>${this.team.name}</h2>
            <h2>Our Tasks</h2>
            <ul class="team-tasks-${this.team.id}" data-id="${this.team.id}">
                ${teamTasks}
            </ul>
        </div>`
    }

    createTaskField(){
        let teamTasks = '';
        for (const task of this.taskList){
            teamTasks += createIndividualTask(this.task)
        };
        return teamTasks;
    }

}
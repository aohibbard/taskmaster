class TeamAdapter{

    constructor(baseURL){
        this.baseURL = baseURL
    }

    fetchTeams(){
        fetch(this.baseURL)
        .then(res => res.json())
        .then(teams => {
            teams.data.forEach(obj => {

                let parsed = {...obj.attributes, tasks: obj.attributes.tasks}
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
        .then(team => {
            let newTeam = new Team(team)
            newTeam.renderTeam()
        })
        .then(newTeamForm.style.display = "none")
    }


    fetchGivenTeam(slug){
        fetch(this.baseURL + "/" + slug.id)
        .then(res => res.json())
        .then(team => {
            let teamObj = new Team(team.data.attributes)
            teamObj.renderTeam(); 

            //If team.tasks exist, render all tasks
            if (!!teamObj.tasks){
                    const taskField = document.getElementById("task-field")
                    let taskGroup = ''
                    for (const task of teamObj.tasks){
                        let taskObj = new Task(task)
                        taskGroup += taskObj.createTaskForDom()
                    }
                    taskField.innerHTML = taskGroup;
                    document.querySelectorAll(".complete").forEach(btn => btn.addEventListener("click", completeStatus));
                    document.querySelectorAll(".delete-tasks").forEach(btn => btn.addEventListener("click", removeTask));
            }
            
        })
        .then(document.getElementById("find-team-form").style.display = "none")
    }
}
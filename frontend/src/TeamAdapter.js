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
            //find out why we get that nested structure of data as a res from our call
            //hopefully tailor the response so that it is exactly the structure needed in order to pass directly to constructor
            //edit constructor also to allow for receiving the task array
            //render the list of tasks to the dom associated with the given team, from that object created from response (your new Team object)

            //It is fast JSON: see: https://github.com/Netflix/fast_jsonapi
            let teamObj = new Team(team.data.attributes)
            teamObj.renderTeam(); 

            if (!!teamObj.tasks){
                const showTasks = new Task(teamObj.tasks[0])
                showTasks.updateAllTasks()

                // let task = Task.all.find(task => task.teamId === teamObj.id)
                // task.updateAllTasks();
            }
            
        })
        .then(document.getElementById("find-team-form").style.display = "none")
    }
}
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
                    const taskField = document.getElementById("task-field")
                    let taskGroup = ''
                    for (const task of teamObj.tasks){
                        let taskObj = new Task(task)
                        taskGroup += taskObj.createTaskForDom()
                    }
                    taskField.innerHTML = taskGroup;
                    document.querySelectorAll(".complete").forEach(btn => btn.addEventListener("click", completeStatus));
                    document.querySelectorAll(".delete-tasks").forEach(btn => btn.addEventListener("click", removeTask));
                    // Task.updateAllTasks(teamObj.tasks)
                    


                // for (const task of teamObj.tasks){
                //     task.renderAllTasks()
                // }

                // const taskField = document.getElementById("task-field");
                // let teamTasks = teamObj.tasks.sort(task => task.teamId === teamObj.id).sort(function(a, b){return a.dueDate - b.dueDate}).sort(function(a, b){return a.complete - b.complete})
                // let taskArr = ''

                // for (const task of teamObj.tasks){
                //     taskArr += showTasks.createTaskForDom(task)
                // }
                // taskField.innerHTML = taskArr;
                // document.querySelectorAll(".complete").forEach(btn => btn.addEventListener("click", completeStatus));
                // document.querySelectorAll(".delete-tasks").forEach(btn => btn.addEventListener("click", removeTask));

                //old code
                // let task = Task.all.find(task => task.teamId === teamObj.id)
                // task.updateAllTasks();
            }
            
        })
        .then(document.getElementById("find-team-form").style.display = "none")
    }
}
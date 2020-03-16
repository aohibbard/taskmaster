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
        .then(team => {
            let newTeam = new Team(team)
            newTeam.renderTeam()
        })
        .then(newTeamForm.style.display = "none")
    }


    fetchGivenTeam(slug){
        fetch(this.baseURL + "/" + slug)
        .then(res => res.json())
        .then(team => {
            let parsed = {id: team.data.id, ...team.data.attributes}
            let teamObj = new Team(parsed)
            teamObj.renderTeam(); 
        })
        .then(document.getElementById("find-team-form").style.display = "none")
    }
}
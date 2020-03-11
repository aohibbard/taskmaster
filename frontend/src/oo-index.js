//toggle form views
let taskFormShow = false;
let newTeamFormShow = false; 

//DOM elements
const bodyMain = document.querySelector('main');
const newTaskBtn = document.querySelector("#add-task")
const taskForm = document.querySelector("#task-form")
const newTeamForm = document.querySelector('#add-team-form')

//initiate fetch
const teamsAdapter = new TeamAdapter("http://localhost:3000/teams")
const tasksAdapter = new TaskAdapter("http://localhost:3000/tasks")

teamsAdapter.fetchTeams()
tasksAdapter.fetchTasks()

const findTeamBtn = document.querySelector("#find-team-submit");
findTeamBtn.addEventListener('click', querySpecificTeam)

function querySpecificTeam(e){
    let searchInput = document.querySelector("#find-team").value; 
    let teamObj = Team.all.find(team => team.name === searchInput)
    if (!!teamObj){
        //teamObj.teamAdapter.fetchGivenTeam();
        TeamAdapter.fetchGivenTeam(teamObj.slug)
    } else {
        console.log("Team does not exist")
    }
};


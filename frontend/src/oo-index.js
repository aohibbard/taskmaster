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
        fetchGivenTeam(teamObj.slug)
    } else {
        console.log("Team does not exist")
    }
};

function fetchGivenTeam(slug){
    const teamsURL = "http://localhost:3000/teams/";

    fetch(teamsURL + slug)
    .then(res => res.json())
    .then(team => {
        let parsed = {id: team.data.id, ...team.data.attributes}
        let teamObj = new Team(parsed)

        teamObj.tasks.push(team.data.attributes.tasks)
        renderTeam(teamObj);
    })
    //.then(() => console.log(this.team))
    //.then(() => renderTeam(team))
}

//async fetch is causing a problem. figure out a work around
function renderTeam(team){
    const teamField = document.querySelector('#team-container')

    //let teamTasks = team.tasks.forEach(createTaskField);    
    teamField.innerHTML = `<div class="team-display" data-id="${team.id}">
        <h2>${team.name}</h2>

        <h4>Our Tasks</h2>
        <button id="load-tasks">Refresh Tasks</button>
        <div class="team-tasks-${team.id}" id="task-field" data-id="${team.id}">
        </div>
    </div>`
    document.getElementById("load-tasks").addEventListener("click", createTaskField)
}

//This could be in the Task Adapter
function createTaskField(e){
    const taskField = document.querySelector("#task-field");
    let targetTeamId = parseInt(e.target.parentNode.dataset.id);
    let targetTeam = Team.all.find(team => team.id === targetTeamId);

    let teamTasksArr = Task.all.filter(task => task.team_id === targetTeamId)
    let teamTasks = '';
    for (const task of teamTasksArr){
        teamTasks += createIndividualTask(task)
    };
    taskField.innerHTML += teamTasks;
}

function createIndividualTask(task){
    return `<div class="task" task-data-id="${task.id}">
        <li>${task.title}</li>
        <li>Due: ${task.due_date}</li>
        <li>Urgency: ${task.urgent}</li>
        <li>Notes: ${task.description}<li>
        <button class="complete" data-id="${task.id}">Complete?</button>
        <button class="delete-tasks" data-id="${task.id}">Delete</button>
        <br>
    </div><br>` ; 
}


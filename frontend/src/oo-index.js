//toggle form views
let taskFormShow = false;
let newTeamFormShow = false; 

const BASE_URL = "http://localhost:3000";
const TEAMS_URL = "http://localhost:3000/teams";
const TASKS_URL = "http://localhost:3000/tasks";

//DOM elements
const bodyMain = document.querySelector('main');
const newTaskBtn = document.querySelector("#add-task")
const taskForm = document.querySelector("#task-form")
const newTeamForm = document.querySelector('#add-team-form')
const addTeamBtn = document.querySelector("#add-team");

const createTeamBtn = document.querySelector("#create-team-btn");


//Toggle Create Task
newTaskBtn.addEventListener("click", () => {
    taskFormShow = !taskFormShow; 
    if (taskFormShow) {
       taskForm.style.display = "block";
    } else {
        taskForm.style.display = "none";
    }
});

//Toggle Create Team
addTeamBtn.addEventListener("click", () => {
    newTeamFormShow = !newTeamFormShow;
    if (newTeamFormShow) {
        newTeamForm.style.display = "block";
    } else {
        newTeamForm.style.display = "none";
    };
});

//initiate fetch
const teamsAdapter = new TeamAdapter("http://localhost:3000/teams");
const tasksAdapter = new TaskAdapter("http://localhost:3000/tasks")

teamsAdapter.fetchTeams()
tasksAdapter.fetchTasks()

const findTeamBtn = document.querySelector("#find-team-submit");
findTeamBtn.addEventListener('click', querySpecificTeam)

function querySpecificTeam(e){
    let searchInput = document.querySelector("#find-team").value; 
    let teamObj = Team.all.find(team => team.name === searchInput)

    if (!!teamObj){
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
        renderTeam(teamObj);
    })
}

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

//ADD NEW TEAM
createTeamBtn.addEventListener("click", newTeamSubmit)

function newTeamSubmit(e){
    let teamName = document.querySelector(".add-team-name").value;
    let teamObj = {name: teamName}
    teamsAdapter.createNewTeam(teamObj)
}


// ADD TASK
const addTaskBtn = document.querySelector(".task-submit");
addTaskBtn.addEventListener("click", newTask)
function newTask(e){
    let taskValues = document.querySelectorAll(".task-input");
    let inputDate = Date.parse(taskValues[1].value);
    let currentTeamId = parseInt(document.querySelector('.team-display').dataset.id);
    let taskObj = {
        'title': taskValues[0].value,
        'dueDate': inputDate,
        'complete': false,
        'urgency': taskValues[2].checked,
        'description': taskValues[4].value,
        'teamID': currentTeamId
    };
    
    tasksAdapter.addNewTask(taskObj)
}


//This could be in the Task Adapter // Write
function createTaskField(e){
    
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

// should this be an anon function
function removeTask(e){
    e.preventDefault();
    
    const targetTaskId = parseInt(document.querySelectorAll(".delete-tasks")[2].dataset.id)
    debugger
    let targetTask = Task.all.find(task => task.id === targetTaskId)
    //tasksAdapter.deleteTask(targetTask)
    targetTask.tasksAdapter.deleteTask()
}




//toggle form views
let taskFormShow = false;
let newTeamFormShow = false; 
let findTeamShow = false;

const BASE_URL = "http://localhost:3000";
const TEAMS_URL = "http://localhost:3000/teams";
const TASKS_URL = "http://localhost:3000/tasks/";

//DOM elements
const bodyMain = document.querySelector('main');
const newTaskBtn = document.querySelector("#add-task")
const taskForm = document.querySelector("#task-form")
const newTeamForm = document.querySelector('#add-team-form')
const addTeamBtn = document.querySelector("#add-team");
const findTeamButton = document.querySelector("#find-team")
const findTeamForm = document.getElementById("find-team-form");

const createTeamBtn = document.querySelector("#create-team-btn");


//Toggle Create Task
function toggleAddTask(e){
    e.preventDefault()
    taskFormShow = !taskFormShow; 
    if (taskFormShow) {
       taskForm.style.display = "block";
    } else {
        taskForm.style.display = "none";
    }
}

//Toggle Create Team
addTeamBtn.addEventListener("click", () => {
    newTeamFormShow = !newTeamFormShow;
    if (newTeamFormShow) {
        newTeamForm.style.display = "block";
    } else {
        newTeamForm.style.display = "none";
    };
});

//Toggle Find Team
findTeamButton.addEventListener("click", () => {
    findTeamShow = !findTeamShow;
    if (findTeamShow){
        findTeamForm.style.display = "block";
    } else {
        findTeamForm.style.display = "none";
    }
});


//initiate fetch
const teamsAdapter = new TeamAdapter("http://localhost:3000/teams");
const tasksAdapter = new TaskAdapter("http://localhost:3000/tasks")

teamsAdapter.fetchTeams()
tasksAdapter.fetchTasks()

//FindSpecificTeam
const findTeamBtn = document.querySelector("#find-team-submit");
findTeamBtn.addEventListener('click', querySpecificTeam)

function querySpecificTeam(e){
    e.preventDefault()
    let searchInput = document.getElementById("find-team-input").value; 
    let teamObj = Team.all.find(team => team.name === searchInput)
    if (!!teamObj){
        teamsAdapter.fetchGivenTeam(teamObj)
    } else {
        console.log("Team does not exist")
    }
};

//ADD NEW TEAM
createTeamBtn.addEventListener("click", newTeamSubmit)

function newTeamSubmit(e){
    let teamName = document.querySelector(".add-team-name").value;
    let teamObj = {name: teamName}
    teamsAdapter.createNewTeam(teamObj)
};

//ADD TASK
const addTaskBtn = document.querySelector(".task-submit");
addTaskBtn.addEventListener("click", newTask)
function newTask(e){
    e.preventDefault();
    
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

//all of this should be routed to Task class
// function createTaskField(e){
//     const taskField = document.querySelector("#task-field");
//     let targetTeamId = parseInt(e.target.parentNode.dataset.id);
//     //let targetTeam = Team.all.find(team => team.id === targetTeamId);

//     let teamTasksArr = Task.all.filter(task => task.teamId === targetTeamId).sort(function(a, b){return a.dueDate - b.dueDate}).sort(function(a, b){return a.complete - b.complete})
//     let teamTasks = '';

//     for (const task of teamTasksArr){
//         teamTasks += tasksAdapter.createIndividualTask(task)
//     };

//     taskField.innerHTML += teamTasks;
//     document.querySelectorAll(".complete").forEach(btn => btn.addEventListener("click", completeStatus));
//     document.querySelectorAll(".delete-tasks").forEach(btn => btn.addEventListener("click", removeTask));
// }

function removeTask(e){
    e.preventDefault();
    const targetTaskId = parseInt(e.target.dataset.id)
    const targetTask = Task.all.find(task => task.id === targetTaskId)
    const parentDiv = (e.target.parentElement).parentElement
    
    tasksAdapter.deleteTask(parentDiv)
}

function completeStatus(e){
    e.preventDefault();

    const targetTaskId = parseInt(e.target.dataset.id)
    const targetTask = Task.all.find(task => task.id === targetTaskId)
    let taskObj = {
        'id': targetTask.id,
        'title': targetTask.title,
        'dueDate': targetTask.dueDate,
        'complete': true,
        'urgency': targetTask.urgency,
        'description': targetTask.description,
        'teamID': targetTask.teamID
    }

    tasksAdapter.markComplete(taskObj)
}



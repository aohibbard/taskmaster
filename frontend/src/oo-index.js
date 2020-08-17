
//toggle form views
let taskFormShow = false;
let newTeamFormShow = false; 
let findTeamShow = false;

// FETCH URLS
const BASE_URL = `https://task-master-backend-api.herokuapp.com/`;
const TEAMS_URL = `https://task-master-backend-api.herokuapp.com/teams`;
const TASKS_URL = `https://task-master-backend-api.herokuapp.com/tasks`;

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


//initiate fetch on DOM load
const teamsAdapter = new TeamAdapter(TEAMS_URL);
const tasksAdapter = new TaskAdapter(TASKS_URL);

teamsAdapter.fetchTeams()
tasksAdapter.fetchTasks()

//FindSpecificTeam
const findTeamBtn = document.querySelector("#find-team-submit");
findTeamBtn.addEventListener('click', querySpecificTeam)

function querySpecificTeam(e){
    e.preventDefault()
    let searchInput = document.getElementById("find-team-input").value.toLowerCase(); 
    let teamObj = Team.all.find(team => team.name.toLowerCase() === searchInput)
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

    // DRAGGABLE FUNCTIONS
    // event handlers in divs when tasks created
    function onDragStart(event){
        event.dataTransfer.setData('text/plain', event.target.id);
    }


    function onDragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move"
    }

    function dropHandler(event) {
        event.stopPropagation();

        const id = event.dataTransfer.getData('text/plain');
    
        const draggableElement = document.getElementById(id);
        //target container div
        const dropzone = event.target.parentElement;
        dropzone.appendChild(draggableElement);
    
      event.dataTransfer.clearData();
    }



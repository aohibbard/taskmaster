
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

// BELOW FUNCTION FROM DRAGGABLE -- NOT IN USE

// function simpleList(){
//     // container selector
//     const containerSelector = '#SimpleList .StackedList';
//     const container = document.querySelector(".team-tasks-2")
//     if ( container.querySelectorAll('h4').length === 0) {
//         return false
//     }
//     const sortable = new Sortable(containers, {
//         draggable: '.StackedListItem--isDraggable',
//         mirror: {
//             //container selector
//           appendTo: containerSelector,
//           constrainDimensions: true,
//         },
//       });
    
//       return sortable 
// }

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

    // DRAG EVENT LISTENERS
    // const element = document.querySelectorAll('.task')
    // element.addEventListener("drag", onDragStart);

    // DRAG FUNCTIONS
    function onDragStart(event){
        event.dataTransfer.setData('text/plain', event.target.id);
        // event.currentTarget.style.border = "dashed";
        // event
        //     .currentTarget
        //     .style
    }

    // function dragstartHandler(event) {
    //     event.dataTransfer.dropEffect = "move";
    //   }

    function onDragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move"
    }

    function dropHandler(event) {
        event.stopPropagation();
        // e.preventDefault();
        // // Get the id of the target and add the moved element to the target's DOM
        // const data = e.dataTransfer.getData("text/html");
        // debugger
        // e.target.appendChild(document.getElementById(data));

        const id = event
        .dataTransfer
        .getData('text/plain');
    
      const draggableElement = document.getElementById(id);
      const dropzone = event.target;
        // debugger
      dropzone.appendChild(draggableElement);
    
      event.dataTransfer.clearData();
    }



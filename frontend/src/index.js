//THIS IS NOT USED. IT IS A PERSONAL REFERENCE FOR A MOSTLY FUNCTIONAL FUNCTIONAL BUILD OF THE SITE




//class AppendHelper

let taskFormShow = false;
let newTeamFormShow = false; 

const BASE_URL = "http://localhost:3000";
const TEAMS_URL = "http://localhost:3000/teams";
const TASKS_URL = "http://localhost:3000/tasks";
const bodyMain = document.querySelector('main');

const newTaskBtn = document.querySelector("#add-task")
const taskForm = document.querySelector("#task-form")
const newTeamForm = document.querySelector('#add-team-form')


// TEAM FUNCTIONS
//this needs an event listener to pass in the team name
const findTeamBtn = document.querySelector("#find-team-submit");
findTeamBtn.addEventListener("click", fetchTeams);

function fetchTeams(e){
    const teamNameInput = document.querySelector("#find-team").value; 

    fetch(TEAMS_URL)
    .then(res => res.json())
    //.then(teams => console.log(teams))
    .then(teams => parseTeam(teams))
    .catch(error => console.log(error));

};

function parseTeam(team){
    for (const teamUnit of team.data){
        let teamAttr = teamUnit.attributes
        let teamCard = displayTeam(teamAttr)
        // displayTeam(teamUnit.attributes)
    }
    //additional functionality of buttons, etc?
    //pass in tasks? teamAttr.tasks.forEach(function to create task array)
}

//Team rendered to DOM by calling this function
function displayTeam(team){
    const teamField = document.querySelector('#team-container')
    let teamTasks = createTaskField(team.tasks)
    teamField.innerHTML += `<div class="team-display" data-id="${team.id}">
        <h2>${team.name}</h2>
        <h2>Our Tasks</h2>
        <ul class="team-tasks-${team.id}" data-id="${team.id}">
            ${teamTasks}
        </ul>
    </div>`
}

function displayNewTeam(team){
    const teamField = document.querySelector('#team-container')
    teamField.innerHTML += `<div class="team-display" data-id="${team.id}">
        <h2>${team.name}</h2>
        <h2>Our Tasks</h2>
        <div class="team-task-container">
        <ul class="team-tasks-${team.id}" data-id="${team.id}">
        </ul>
        </div>
    </div>`
}

//APPENDING TASKS TO DOM

function createTaskField(taskList){
    let teamTasks = '';
    for (const task of taskList){
        teamTasks += createIndividualTask(task)
    };
    return teamTasks;
}

function createIndividualTask(task){
    return `<div class="task" task-data-id="${task.id}">
        <li>${task.title}</li>
        <li>Due: ${task.due_date}</li>
        <li>Urgency: ${task.urgent}</li>
        <li>Notes: ${task.description}<li>
        <button class="complete" data-id="${task.id}">Complete?</button>
        <button class ="delete-tasks" data-id="${task.id}">Delete</button>
        <br>
    </div>` ; 
    //edit & delete functions?
    //const completeBtn = document.getElementsByClassName("#complete");
    //completeBtn.addEventListener('click', completeTask) 
}

function completeTask(e){
    //complete task
    //target dataset
}

//TASK METHODS
//Fetch & Render





//toggle view of add team form

const addTeamBtn = document.querySelector("#add-team");

addTeamBtn.addEventListener("click", () => {
    newTeamFormShow = !newTeamFormShow;
    if (newTeamFormShow) {
        newTeamForm.style.display = "block";
    } else {
        newTeamForm.style.display = "none";
    };
});

//create team Function

 const createTeamBtn = document.querySelector("#create-team-btn");
 createTeamBtn.addEventListener("click", createTeam)

 function createTeam(e){
    let configObj = {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            name: document.querySelector(".add-team-name").value,
        })
    };
    fetch(TEAMS_URL, configObj)
    .then(res => res.json())
    .then(team => displayNewTeam(team))
};



// toggle view of create task 
newTaskBtn.addEventListener("click", () => {
    taskFormShow = !taskFormShow; 
    if (taskFormShow) {
       taskForm.style.display = "block";
    } else {
        taskForm.style.display = "none";
    }
});

document.querySelector(".task-submit").addEventListener("click", addTask);
function addTask(e){
    //e.preventDefault()
    //change to have target id or wahtever
    //const goopUl = document.querySelector(".team-tasks-3")

    let taskInputs = document.querySelectorAll("input.task-input");
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            "title": taskInputs[0].value,
            "due_date": taskInputs[1].value,
            "urgency": taskInputs[2],
            // this is not reading the checked value
            "complete": false,
            "description": taskInputs[4].value,
            "team_id": 3,
            // "created_at": ,
        }),
    };
    
    fetch(TASKS_URL, configObj)
    .then( res => res.json())
    .then( newTask => {
       let taskElement = createIndividualTask(newTask)
        goopUl.innerHTML += taskElement;
    });
};
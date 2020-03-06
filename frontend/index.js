//class AppendHelper

let taskFormShow = false;


const BASE_URL = "http://localhost:3000";
const TEAMS_URL = "http://localhost:3000/teams";
const TASKS_URL = "http://localhost:3000/tasks";
const bodyMain = document.querySelector('main');

const newTaskBtn = document.querySelector("#add-task")
const taskForm = document.querySelector("#task-form")


// TEAM FUNCTIONS
//to fetch specific team, we need to pass in an argument of team name, then query that specific name in the fetch command
function fetchTeams(){
    // CHANGE TO ACCEPT PARAMETERS
    fetch(TEAMS_URL)
    .then(res => res.json())
    .then(teams => parseTeam(teams));
};

function parseTeam(team){
    for (const teamUnit of team.data){
        let teamAttr = teamUnit.attributes
        let teamCard = displayTeam(teamAttr)
    }
    //additional functionality of buttons, etc?
    //pass in tasks? teamAttr.tasks.forEach(function to create task array)
}

//Team rendered to DOM by calling this function
function displayTeam(team){
    const teamField = document.querySelector('#team-container')
    teamField.innerHTML += `<div class="team-display" data-id="${team.id}">
        <h2>${team.name}</h2>
        <h2>Our Tasks</h2>
    </div>`
}

//TASK METHODS
//Fetch & Render

//must pass in team_id
function getTasks(){
    fetch(TASKS_URL)
    .then(res => res.json())
    .then (tasks => console.log(tasks))
    // add DOM function => identify team's tasks
};

function taskCard(){
    let tasks = document.querySelector("#task-container")
    tasks.innerHTML += `<div class="task" data-set="${task.id}">
        <h3>${task.title}</h3>
        <p>Due: ${task.due_date}</p>
        <p>Urgency: ${task.urgent}</p>
        <p>Notes: ${task.description}<p>
        <button class="complete" id="${task.id}">Complete?</button>
    </div>`;
    //edit & delete functions?
    const completeBtn = document.getElementsByClassName("#complete");
    //completeBtn.addEventListener('click', (e) => //complete status) 
}



//ADDING TASK
//toggle view, task form
//send post request
//append task to DOM


newTaskBtn.addEventListener("click", () => {
    taskFormShow = !taskFormShow; 
    if (taskFormShow) {
       taskForm.style.display = "block";
    } else {
        taskForm.style.display = "none";
    }
    //post
});
document.querySelector(".task-submit").addEventListener("click", addTask);
function addTask(e){
    //e.preventDefault()


    // >>>> DEBUG FROM HERE!!!!
    let taskInputs = document.querySelectorAll("input.task-input");
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            "name": taskInputs[0].value,
            "due_date": taskInputs[1].value,
            "urgency": taskInputs[2],
            // this is not reading the checked value
            "complete": false,
            "description": taskInputs[4].value
            // "team_id": ,
            // "created_at": ,
        }),
    };
    fetch("TASKS_URL", configObj)
    .then( res => res.json())
    .then( newTask => console.log(newTask))
    //.then(newTask => renderToDOM)
}

fetchTeams();
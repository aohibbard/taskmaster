const BASE_URL = "http://localhost:3000";
const TEAMS_URL = "http://localhost:3000/teams";
const TASKS_URL = "http://localhost:3000/tasks";
const bodyMain = document.querySelector('main');

function fetchTeams(){
    fetch(TEAMS_URL)
    .then(res => res.json())
    .then(teams => console.log(teams))
    // function to add queried team to DOM
}

fetchTeams();
//basically fetch

class TaskAdapter{
    constructor(baseURL){
        this.baseURL = baseURL;
    }

    fetchTasks(){
        fetch(this.baseURL)
        .then(res => res.json())
        .then (tasks => {
            tasks.data.forEach(obj => {
                let parsed = obj.attributes
                //new Task(parsed.id, parsed.title, parsed.due_date, parsed.urgency, parsed.description, parsed.team_id)
                new Task(parsed)
            })
        })
        .then(() => console.log(Task.all))
    }

    deleteTask(e){
        const chosenTask = e.dataset.id;
        //const chosenTask = parseInt(document.querySelector(".delete-tasks").dataset.id);
        fetch(``)
    }  
}

/* document.querySelector(".task-submit").addEventListener("click", addTask);
function addTask(e){
    //e.preventDefault()
    //change to have target id or wahtever
    const goopUl = document.querySelector(".team-tasks-3")

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
}; */
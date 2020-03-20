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
                new Task(parsed)
            })
        })
        .then(() => console.log(Task.all))
        //.then(() => console.log("Tasks loaded"))
    }

    //POST TASK
    addNewTask(taskObj){

        const form = document.querySelector(".add-task-form")

        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(taskObj)
        }
        fetch(this.baseURL, configObj)
        .then(resp => resp.json())
        .then(task => {
            let newTask = new Task(task)
            newTask.updateAllTasks();
            form.reset()
        })
        //.then(form.reset)
        //need to change this to toggle off 

    };


    // createIndividualTask(task){
    //     let dueOn = parseInt(task.dueDate)
    //     let dateToS = new Date(dueOn)
    //     let showDate = String(dateToS).replace("00:00:00 GMT-0400", "")
    //     //show date obvi needs better functionality

    //     if (!task.complete && !task.urgency) {
    //     return `<div class="task" task-data-id="${task.id}" style="background-color:white">
    //         <h4>${task.title}</h4>
    //         <p>Due: ${showDate} </p>
    //         <p>Notes: ${task.description}<p>
    //         <button class="complete" data-id="${task.id}">Complete?</button>
    //         <button class="delete-tasks" data-id="${task.id}">Delete</button>
    //         <br>
    //         </div><br>` ; 
    //     } else if (!task.complete && !!task.urgency){
    //         return `<div class="task" task-data-id="${task.id}" style="background-color:lemonchiffon">
    //         <h4>${task.title}</h4>
    //         <p>Due: ${showDate} </p>
    //         <p>Notes: ${task.description}<p>
    //         <button class="complete" data-id="${task.id}">Complete?</button>
    //         <button class="delete-tasks" data-id="${task.id}">Delete</button>
    //         <br>
    //         </div><br>` ;
    //     } else {
    //         return `<div class="task" task-data-id="${task.id}" style="background-color:white">
    //         <h4>${task.title}</h4>
    //         <p>Due: ${showDate} </p>
    //         <p>Notes: ${task.description}<p>
    //         <button class="delete-tasks" data-id="${task.id}">Delete</button>
    //         <br>
    //         </div><br>`
    //     }
    // };

    //COMPLETE PATCH
    markComplete(task){
        //const updateDom = new Task.updateAllTasks(parsed)
        
        let configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(task)
        };
        fetch(this.baseURL + `/${task.id}`, configObj)
        .then(res => res.json())
        .then(task => {
            let parsed = task.data.attributes

            let targetTask = Task.all.find(task => task.id === parsed.id)
            targetTask.complete = true;
            targetTask.urgency = false;
            targetTask.updateAllTasks()
            //  .then(document.getElementById("task-field").innerHTML = '')

        })
    }

    deleteTask(task){
        const targetTaskId = parseInt(task.querySelector('button').dataset.id)
        // const targetTask = Task.all.find(task => task.id === targetTaskId)

        fetch(this.baseURL + `/${targetTaskId}`, {
            method: 'DELETE'
        })
        .then(() => {
            Task.all = Task.all.filter(taskObj => taskObj.id !== targetTaskId)
            //Effectively, delete Task from Task.all by saying Task.all === everything except deleted task
            task.remove()
        })
    } 
}

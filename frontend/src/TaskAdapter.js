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
        //.then(() => console.log("Tasks successfully loaded"))
    }

    addNewTask(taskObj){
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
        .then(newTask => console.log(newTask))
        .then(newTeamForm.style.display = "none")
        //append to Dom
        //hide task view

    };

    addTasktoDom(task){
        const taskField = document.querySelector("#task-field");
        //sort if !complete - append to dom first
        //sort by due date UTC desc 
        //if complete 

    }

    createIndividualTask(task){
        //conditions for boolean
        /*if (!!task.dueDate) {
            let readableDate = Date(task.dueDate)
        } else { 
            let readableDate = "No Due Date"}; */

        return `<div class="task" task-data-id="${task.id}">
            <li>${task.title}</li>
            <li>Due: due Date here</li>
            <li>Notes: ${task.description}<li>
            <button class="complete" data-id="${task.id}">Complete?</button>
            <button class="delete-tasks" data-id="${task.id}">Delete</button>
            <br>
            </div><br>` ; 
    };

    deleteTask(task){
        console.log(task)
        fetch(this.baseURL + `/${task.id}`, {
            method: 'DELETE'
        });
        //how to dynamically remove JS obj?
    } 
}

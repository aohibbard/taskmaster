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
        .then(newTask => (newTask))
        //append to Dom
        //hide task view

    };

    addTasktoDom(task){
        const taskField = document.querySelector("#task-field");
        

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

    // deleteTask(e){
    //     const chosenTask = e.dataset.id;
    //     //const chosenTask = parseInt(document.querySelector(".delete-tasks").dataset.id);
    //     fetch(`http://localhost:3000/tasks/${chosenTask}`){
    //         method: "DELETE"
    //     };
        //remove from DOM?
    // }  
}

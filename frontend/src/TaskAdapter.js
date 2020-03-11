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


    
}
class Team{

    static all = [];

    constructor({id, name, slug}){
        this.id = id,
        this.name = name;
        this.slug = slug;
       // this.tasks = []

        Team.all.push(this)
    }

    tasks(){
        Task.all.filter(task => task.teamId == this.id)
    }
}
class Team{

    static all = [];

    constructor({id, name, slug}){
        this.id = id,
        this.name = name;
        this.slug = slug;
       // this.tasks = []

        Team.all.push(this)
    }

    findTeam(query){
        return Team.all.find(team => team.name === query)
    }

    tasks(){
        Task.all.filter(task => task.teamId == this.id)
    }
}
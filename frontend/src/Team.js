class Team{

    static all = [];

    constructor({name, slug}){
        this.name = name;
        this.slug = slug;

        Team.all.push(this)
    }

    findTeam(query){
        return Team.all.find(query => query === this.name)

    }
}
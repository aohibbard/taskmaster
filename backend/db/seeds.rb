# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Team.create(name: "Boomtown Rats")
Team.create(name: "Dixie Chicks")
Team.create(name: "Goop")

# due_date needs something like due_date: Date.parse(yyyy-mm-dd)

Task.create(title: "Abolish Mondays", complete: false, urgency: true, description: "I hate Mondays!", team_id: 1)
Task.create(title: "Release Second Hit Single",  complete: false, urgency: true, description: "This one could be about Tuesdays", team_id: 1)
Task.create(title: "Kill Earl", complete: false, urgency: false, description: "Earl had to die", team_id: 2)
Task.create(title: "Call out GWB", complete: false, urgency: false, description: "We're not ready to make nice", team_id: 2)
Task.create(title: "Release new album", complete: false, urgency: true, description: "Don't gaslight me, Jack Antonoff", team_id: 2)
Task.create(title: "Light My Candle", complete: false, urgency: false, description: "You know what it smells like", team_id: 3)
Task.create(title: "Cold Shower", complete: false, urgency: false, description: "Wim Hoff for life", team_id: 3)
Task.create(title: "Glow!", complete: false, urgency: false, description: "Goop Glow Vitamin C Serum is the ticket!", team_id: 3)

User.create(name: "Gwyneth Paltrow", email: "gp@goop.com", team_id: 3)
User.create(name: "Will Cole", email: "wc@goop.com", team_id: 3)
User.create(name: "Natalie Maines", email: "nm@dc.com", team_id: 2)
User.create(name: "Emily Erwin Robison", email: "eer@dc.com", team_id: 2)


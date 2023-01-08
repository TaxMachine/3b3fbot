const 
    {username2uuid} = require('../../functions/username'),
    {clean} = require('../../functions/cleaner')

module.exports = {
    name: "stats",
    syntax: "stats <username>",
    description: "Displays someone's kill and death count",
    func: async function(bot, args, argtable) {
        if (args.length == 1) return bot.chat(`Wrong syntax: ${this.syntax}`)
        argtable.db.get(`SELECT kill, death FROM killcount WHERE uuid = $uuid`, {
            $uuid: bot.players[clean(args[1])].uuid
        }, (err, row) => {
            if (err) return bot.chat("No such players")
            bot.chat(`${clean(args[1])} stats\nKills: ${row.kill}\nDeath: ${row.death}`)
        })
    }
}
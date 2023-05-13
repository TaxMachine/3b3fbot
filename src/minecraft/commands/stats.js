const 
    {username2uuid} = require('../../functions/username'),
    {clean} = require('../../functions/cleaner')

module.exports = {
    name: "stats",
    syntax: "stats <username>",
    description: "Displays someone's kill and death count",
    func: async function(bot, args, argtable) {
        console.log(args)
        if (args.length == 1) return bot.chat(`Wrong syntax: ${this.syntax}`)
        var cleaned = clean(args[1])
        if (!Object.keys(bot.players).includes(cleaned)) return bot.chat("No such player")
        argtable.db.db.get(`SELECT kill, death FROM killcount WHERE uuid = $uuid`, {
            $uuid: bot.players[cleaned].uuid
        }, (err, row) => {
            if (err || !row) return bot.chat("No such players")
            bot.chat(`${cleaned} stats -> Kills: ${row.kill} Death: ${row.death} KDR: ${Math.round(row.kill / row.death)}`)
        })
    }
}
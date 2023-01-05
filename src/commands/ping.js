const 
    {username2uuid} = require(`../functions/username`),
    {clean} = require('../functions/cleaner')

module.exports = {
    name: "ping",
    syntax: "ping <username>",
    description: "Displays the ping of a specified player",
    func: async function(bot, args, argtable) {
        if (args.length == 1) return bot.chat(`Wrong syntax: ${this.syntax}`)
        var cleaned = await clean(args[1])
        var uuid = await username2uuid(cleaned)
        argtable.db.get(`SELECT ping, uuid FROM playerinfo WHERE uuid = $uuid`, {
            $uuid: uuid
        }, (err, row) => {
            if (err) return bot.chat("No such player")
            bot.chat(`${cleaned}'s ping: ${row.ping}ms`)
        })
    }
}
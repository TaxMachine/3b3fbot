const minecraft = require(`../../functions/username`)

module.exports = {
    name: "ping",
    func: async function(bot, args, argtable) {
        if (args.length == 1) return bot.chat("Please specify a player to lookup")
        var cleaned = args[1].replace(/-|\\|\/|:|\//g, "")
        var uuid = await minecraft.username2uuid(cleaned)
        argtable.db.get(`SELECT ping, uuid FROM playerinfo WHERE uuid = $uuid`, {
            $uuid: uuid
        }, (err, row) => {
            if (err) return bot.chat("No such player")
            bot.chat(`${cleaned}'s ping: ${row.ping}ms`)
        })
    }
}
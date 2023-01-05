const 
    {username2uuid} = require('../functions/username'),
    {clean} = require('../functions/cleaner')

module.exports = {
    name: "seen",
    syntax: `seen <username>`,
    description: "Displays the last seen coordinates of a specified player",
    func: async function(bot, args, argtable) {
        if (args.length == 1) return bot.chat(`Wrong syntax: ${this.syntax}`)
        var cleaned = await clean(args[1])
        var uuid = await username2uuid(cleaned)
        argtable.db.get(`SELECT lastseenpos, uuid FROM playerinfo WHERE uuid = $uuid`, {
            $uuid: uuid
        }, (err, row) => {
            if (err || row == null) return bot.chat("No such player")
            var coords = JSON.parse(row.lastseenpos)
            bot.chat(`${cleaned} was last seen at: X: ${coords.x} Y: ${coords.y} Z: ${coords.z}`)
        })
    }
}
const 
    {username2uuid} = require('../functions/username'),
    {clean} = require('../functions/cleaner')

module.exports = {
    name: "seen",
    syntax: `seen <username>`,
    description: "Displays the last seen coordinates of a specified player",
    func: async function(bot, args, argtable) {
        if (args.length == 1) return bot.chat(`Wrong syntax: ${this.syntax}`)
        var cleaned = clean(args[1])
        var uuid = await username2uuid(cleaned)
        argtable.db.get(`SELECT lastseen, uuid FROM playerinfo WHERE uuid = $uuid`, {
            $uuid: uuid
        }, (err, row) => {
            if (err) return bot.chat("No such player")
            var coords = JSON.parse(row.lastseen)
            bot.chat(`${cleaned} was last seen at: X: ${coords.x} Y: ${coords.y} Z: ${coords.z}`)
        })
    }
}
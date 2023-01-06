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
        argtable.db.get(`SELECT lastseenpos, lastseentime, uuid FROM playerinfo WHERE uuid = $uuid`, {
            $uuid: uuid
        }, (err, row) => {
            if (err || row == null) return bot.chat("No such player")
            var 
                coords = JSON.parse(row.lastseenpos),
                viewed = new Date(parseInt(row.lastseentime)),
                textview = `${viewed.getDate()}-${viewed.getMonth()}-${viewed.getFullYear()} ${viewed.getHours()}:${viewed.getMinutes()}:${viewed.getSeconds()}`
            bot.chat(`${cleaned} was last seen at: X: ${coords.x ? coords.x : "none"} Y: ${coords.y ? coords.y : "none"} Z: ${coords.z ? coords.z : "none"}\nLast seen Timestamp: ${textview}`)
        })
    }
}
const 
    {username2uuid} = require('../../functions/username'),
    {clean} = require('../../functions/cleaner')

module.exports = {
    name: "seen",
    syntax: `seen <username>`,
    description: "Displays the last seen coordinates of a specified player",
    func: async function(bot, args, argtable) {
        if (args.length == 1) return bot.chat(`Wrong syntax: ${this.syntax}`)
        var cleaned = clean(args[1])
        if (!Object.keys(bot.players).includes(cleaned)) return bot.chat("No such player")
        var uuid = bot.players[cleaned].uuid.replace(/-/g, "")
        argtable.db.get(`SELECT lastseenpos, lastseentime, uuid FROM playerinfo WHERE uuid = $uuid`, {
            $uuid: uuid
        }, (err, row) => {
            if (err || !row) return bot.chat("No such player")
            var 
                coords = row.lastseenpos ? JSON.parse(row.lastseenpos) : null,
                viewed = new Date(parseInt(row.lastseentime)),
                textview = `${viewed.getDate()}-${viewed.getMonth()}-${viewed.getFullYear()} ${viewed.getHours()}:${viewed.getMinutes()}:${viewed.getSeconds()}`
            bot.chat(`${cleaned} was last seen X: ${coords ? coords.x : "none"} Y: ${coords ? coords.y : "none"} Z: ${coords ? coords.z : "none"} at ${textview}`)
        })
    }
}
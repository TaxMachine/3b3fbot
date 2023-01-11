const 
    {username2uuid} = require('../../functions/username'),
    {clean} = require('../../functions/cleaner'),
    {calculatept} = require('../../functions/math')
module.exports = {
    name: "pt",
    syntax: "pt <username>",
    description: "Displays the playtime of a specified player",
    func: async function(bot, args, argtable) {
        if (args.length == 1) return bot.chat(`Wrong syntax: ${this.syntax}`)
        var cleaned = clean(args[1])
        if (!Object.keys(bot.players).includes(cleaned)) return bot.chat("No such player")
        var uuid = bot.players[cleaned].uuid.replace(/-/g, "")
        argtable.db.get(`SELECT playtime FROM joindates WHERE uuid = $uuid`, {
            $uuid: uuid
        }, async(err, row) => {
            if (err || !row) return bot.chat(`No such player ${cleaned}`)
            var ts = calculatept(row.playtime)
            bot.chat(`${cleaned} played ${ts.days} days ${ts.hours}h ${ts.minutes}min ${ts.seconds}sec`)
        })
    }
}
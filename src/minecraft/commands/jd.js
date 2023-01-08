const {clean} = require('../../functions/cleaner')

module.exports = {
    name: "jd",
    syntax: "jd <username>",
    description: "Displays the join date (since the bot joined the server) of a specified player",
    func: async function(bot, args, argtable) {
        if (args.length == 1) return bot.chat(`Wrong syntax: ${this.syntax}`)
        var cleaned = clean(args[1])
        argtable.db.get(`SELECT joinedAt, username FROM players WHERE username = $username`, {$username: cleaned}, (err, row) => {
            if (err) return bot.chat(`No such player "${cleaned}"`)
            var
                time = row.joinedAt.replace(".0", ""),
                date = new Date(parseInt(time))
            bot.chat(`${cleaned} joined on ${date.getDate()}-${date.getMonth()}-${date.getFullYear()} at ${date.getHours()}h ${date.getMinutes()}min ${date.getSeconds()}sec and ${date.getMilliseconds()}ms`)
        })
    }
}
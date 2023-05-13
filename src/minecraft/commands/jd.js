const {clean} = require('../../functions/cleaner')

module.exports = {
    name: "jd",
    syntax: "jd <username>",
    description: "Displays the join date (since the bot joined the server) of a specified player",
    func: async function(bot, args, argtable) {
        if (args.length == 1) return bot.chat(`Wrong syntax: ${this.syntax}`)
        var cleaned = clean(args[1])
        argtable.db.db.get(`SELECT joinedAt, username FROM players WHERE username = $username`, {$username: cleaned}, (err, row) => {
            if (err || !row) return bot.chat(`No such player "${cleaned}"`)
            var
                time = row.joinedAt.replace(".0", ""),
                date = new Date(parseInt(time))
            bot.chat(`I first saw ${cleaned} on the ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()} at ${date.getHours()}h ${date.getMinutes()}min ${date.getSeconds()}sec and ${date.getMilliseconds()}ms`)
        })
    }
}
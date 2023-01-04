module.exports = {
    name: "jd",
    func: async function(bot, args, argtable) {
        if (args.length == 1) {
            bot.chat("Syntax error: !jd <Player name>")
            return
        }
        var cleaned = args[1].replace(/-|\\|\/|:|\//, "")
        argtable.db.get(`SELECT joinedAt, username FROM players WHERE username = $username`, {$username: cleaned}, (err, row) => {
            if (err) return
            var
                time = row.joinedAt.replace(".0", ""),
                date = new Date(parseInt(time))
            bot.chat(`${cleaned} joined on ${date.getDate()}-${date.getMonth()}-${date.getFullYear()} at ${date.getHours()}h ${date.getMinutes()}min ${date.getSeconds()}sec and ${date.getMilliseconds()}ms`)
        })
    }
}
const 
    {username2uuid} = require(`../../functions/username`),
    {clean} = require('../../functions/cleaner')

module.exports = {
    name: "ping",
    syntax: "ping <username>",
    description: "Displays the ping of a specified player",
    func: async function(bot, args, argtable) {
        if (args.length == 1) return bot.chat(`Wrong syntax: ${this.syntax}`)
        var cleaned = clean(args[1])
        if (!bot.players.hasOwnProperty(cleaned)) return bot.chat("No such player online")
        bot.chat(`${cleaned}'s ping: ${bot.players[cleaned].ping}`)
    }
}
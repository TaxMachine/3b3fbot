const 
    {uuid2username} = require('../../functions/username'),
    {clean} = require('../../functions/cleaner')

module.exports = {
    name: "gayrate",
    syntax: "gayrate <username>",
    description: "Gives the gayrate of a specified player",
    func: async function(bot, args, argtable) {
        if (args.length == 1) return bot.chat(`Wrong syntax: ${this.syntax}`)
        var 
            gay = Math.floor(Math.random()*100),
            cleaned = clean(args[1])
        if (!bot.players.hasOwnProperty(cleaned)) return bot.chat("No such player online")
        if (bot.players[cleaned].uuid.replace(/-/g, "") == "64a7dadab6d4433d9b803c96f91ed370") gay = 0
        bot.chat(`${cleaned} is ${gay}% gay`)
    }
}
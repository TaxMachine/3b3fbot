const {uuid2username} = require('../../functions/username')

module.exports = {
    name: "gayrate",
    syntax: "gayrate <username>",
    description: "Gives the gayrate of a specified player",
    func: async function(bot, args, argtable) {
        if (args.length == 1) return bot.chat(`Wrong syntax: ${this.syntax}`)
        var gay = Math.floor(Math.random()*100)
        if (args[1] == uuid2username("64a7dadab6d4433d9b803c96f91ed370")) gay = 0
        bot.chat(`${args[1].replace(/-|\\|\/|:|\//g, "")} is ${gay}% gay`)
    }
}
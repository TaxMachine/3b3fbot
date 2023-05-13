const {commands} = require('../Command'), config = require("../../config.json"), {clean} = require('../../functions/cleaner')

module.exports = {
    name: "help",
    syntax: "help",
    description: "Displays every commands and syntax",
    func: async function(bot, args, argtable) {
        for (var i = 0; i < args.length; i++) {
            if (args[i] === '') {
                args.splice(i, 1)
            }
        }
        if (args.length == 2) {
            commands().forEach(cmd => {
                if (cmd.name === clean(args[1])) bot.chat(`${config.prefix}${cmd.syntax}`)
                else bot.chat("This command does not exist")
            })
        } else {
            var help = ""
            commands().forEach(cmd => help += `${config.prefix}${cmd.name}, `)
            console.log(help)
            bot.chat(`${help} **type !help <command> for more info**`)
        }
    }
}
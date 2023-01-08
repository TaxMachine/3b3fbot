const {commands} = require('../Command'), config = require("../../config.json")

module.exports = {
    name: "help",
    syntax: "help",
    description: "Displays every commands and syntax",
    func: async function(bot, args, argtable) {
        var help = ""
        commands().forEach(cmd => {
            help += `${config.prefix}${cmd.syntax} -> ${cmd.description}\n`
        });
        bot.chat(help)
    }
}
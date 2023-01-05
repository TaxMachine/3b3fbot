module.exports = {
    name: "tps",
    syntax: "tps",
    description: "Displays the server tps",
    func: async function(bot, args, argtable) {
        bot.chat(`Current TPS: ${argtable.tps}`)
    }
}
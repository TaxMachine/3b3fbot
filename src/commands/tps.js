module.exports = {
    name: "tps",
    func: async function(bot, args, argtable) {
        bot.chat(`Current TPS: ${argtable.tps}`)
    }
}
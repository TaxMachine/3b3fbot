module.exports = async function(bot, argtable) {
    bot.on("time", async() => {
        argtable.tps = bot.getTps()
    })
}
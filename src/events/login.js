module.exports = async function(bot, argtable) {
    bot.on("login", async() => {
        console.log(`Connected to ${bot.host}:${bot.port}`)
    })
}
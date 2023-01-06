const config = require('../config.json')

module.exports = async function(bot, argtable) {
    bot.on("login", async() => {
        console.log(`${bot.entity.username} connected on ${config.host}:${config.port}`)
    })
}
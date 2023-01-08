const
    {playerUpdate} = require('../../functions/database')

module.exports = async function(bot, argtable) {
    bot.on("playerUpdated", async(player) => {
        if (player.username == bot.username) return
        playerUpdate(player)
    })
}
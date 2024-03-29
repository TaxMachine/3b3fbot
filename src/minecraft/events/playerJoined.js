const 
    {wsendEmbed} = require('../../functions/webhook'), 
    config = require('../../config.json'), 
    {mcavatar} = require('../../functions/username')

module.exports = async function(bot, argtable) {
    bot.on("playerJoined", async(player) => {
        if (player.username == bot.username) return
        argtable.timestamps.push({
            uuid: player.uuid.replace(/-/g, ""),
            join: new Date().getTime(),
            leave: null
        })
        argtable.db.addPlayerJoin(player.username, player.uuid.replace(/-/g, ""), Date.now())
        await wsendEmbed(config.webhook, `${player.username}`, mcavatar(player.uuid.replace(/-/g, "")), {
            title: "Joined the game",
            color: 65280
        })
    })
}
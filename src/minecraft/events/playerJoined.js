const {wsendEmbed} = require('../../functions/webhook'), config = require('../../config.json'), {mcavatar} = require('../../functions/username'), {addPlayerJoin} = require('../../functions/database')

module.exports = async function(bot, argtable) {
    bot.on("playerJoined", async(player) => {
        console.log(player)
        if (player.username == bot.username) return
        argtable.timestamps.push({
            uuid: player.uuid.replace(/-/g, ""),
            join: new Date().getTime(),
            leave: null
        })
        addPlayerJoin(player.username, player.uuid.replace(/-/g, ""), Date.now())
        await wsendEmbed(config.webhook, `${player.username}`, mcavatar(player.uuid.replace(/-/g, "")), {
            title: "Joined the game",
            color: 65280
        })
    })
}
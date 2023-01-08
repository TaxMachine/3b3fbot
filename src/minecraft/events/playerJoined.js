module.exports = async function(bot, argtable) {
    bot.on("playerJoined", async(player) => {
        if (player.username == bot.username) return
        argtable.timestamps.push({
            uuid: player.uuid.replace(/-/g, ""),
            join: new Date().getTime(),
            leave: null
        })
    })
}
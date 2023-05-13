module.exports = async function(client, bot) {
    client.on("messageCreate", async(message) => {
        if (message.channel.id != "1104485873883557938" || message.author.bot) return
        bot.chat(`[Discord] ${message.author.username} > ${message.content}`)
    })
}
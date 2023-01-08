module.exports = async function(client, bot) {
    client.on("message", async(message) => {
        if (message.channel.id != "1058426715078152322" || message.author.bot) return
        bot.chat(`[Discord] ${message.author.username} > ${message.content}`)
    })
}
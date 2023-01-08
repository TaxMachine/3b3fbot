module.exports = async function(client, bot) {
    client.on("message", async(message) => {
        if (!message.guild.channel == "1058426715078152322") return
        bot.chat(`[Discord] ${message.author.username} > ${message.content}`)
    })
}
const
    {username2uuid, mcavatar, uuid2username} = require('../../functions/username'),
    {wsendEmbed, wsend} = require('../../functions/webhook'),
    config = require('../../config.json'),
    {commands} = require('../Command'),
    {addPlayerJoin} = require('../../functions/database')

module.exports = async function(bot, argtable) {
    bot.on('message', async(jsonmsg, position, sender, verified) => {
        var uuid = sender == "00000000-0000-0000-0000-000000000000" ? null : sender.replace(/-/g, "")
        if (uuid == null) return
        var
            player = await uuid2username(uuid),
            joinedAt = Date.now().toString()
            

        addPlayerJoin(player, uuid, joinedAt)
        if (jsonmsg.translate == "multiplayer.player.joined" && player !== bot.username) {
            await wsendEmbed(config.webhook, `${player}`, mcavatar(uuid), {
                title: "Joined the game",
                color: 65280
            })
        }

        if (jsonmsg.translate == "multiplayer.player.left" && player !== bot.username) {
            await wsendEmbed(config.webhook, `${player}`, mcavatar(uuid), {
                title: "Left the game",
                color: 16711680
            })
        }

        if (jsonmsg.with.length == 1) return

        if (jsonmsg.translate !== "chat.type.text") return

        await wsend(config.webhook, `${jsonmsg.with[1].text.replace(/@|\${|\\/g, "")}`, mcavatar(uuid), player)
        if (player == bot.username) return
        if (!jsonmsg.with[1].text.startsWith(config.prefix)) return

        var
            msg = jsonmsg.with[1].text,
            args = msg.split(" ")
        commands().forEach(cmd => {
            if (msg.startsWith(config.prefix + cmd.name)) cmd.func(bot, args, argtable)
        })
    })
}
const
    {mcavatar, uuid2username} = require('../../functions/username'),
    {wsend} = require('../../functions/webhook'),
    config = require('../../config.json'),
    {commands} = require('../Command')

module.exports = async function(bot, argtable) {
    bot.on('message', async(jsonmsg, position, sender, verified) => {
        console.log(jsonmsg)
        if (jsonmsg.text == '') return
        var uuid = bot.players[jsonmsg.with[0].text] == undefined ? null : bot.players[jsonmsg.with[0].text].uuid
        if (uuid == null) return
        if (jsonmsg.translate == "commands.message.display.incoming" || jsonmsg.translate == "commands.message.display.outgoing") return
        if (jsonmsg.with[0].text.startsWith("[DM]")) return
        var 
            player = await uuid2username(uuid), 
            message = jsonmsg.with[1].text
        console.log(message)
        if (message.startsWith("[Discord]")) return
        await wsend(config.webhook, `${message.replace(/@|\${|\\/g, "")}`, mcavatar(uuid), player)
        if (player == bot.username) return
        
        if (!message.startsWith(config.prefix)) return

        var args = message.split("|")[0].split(" ")
        console.log(args)
        commands().forEach(cmd => {
            if (message.startsWith(config.prefix + cmd.name)) cmd.func(bot, args, argtable)
        })
    })
}
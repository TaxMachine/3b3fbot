const
    {mcavatar, uuid2username} = require('../../functions/username'),
    {wsend} = require('../../functions/webhook'),
    config = require('../../config.json'),
    {commands} = require('../Command')

module.exports = async function(bot, argtable) {
    bot.on('message', async(jsonmsg, position, sender, verified) => {
        var uuid = sender == "00000000-0000-0000-0000-000000000000" ? null : sender.replace(/-/g, "")
        if (uuid == null) return
        console.log(jsonmsg)
        if (jsonmsg.translate == "commands.message.display.incoming" || jsonmsg.translate == "commands.message.display.outgoing") return
        var 
            player = await uuid2username(uuid), 
            message = jsonmsg.text.split("> ")[1]

        if (message.startsWith("[Discord]")) return
        await wsend(config.webhook, `${message.replace(/@|\${|\\/g, "")}`, mcavatar(uuid), player)
        if (player == bot.username) return
        
        if (!message.startsWith(config.prefix)) return

        var args = message.split("|")[0].split(" ")
        commands().forEach(cmd => {
            if (message.startsWith(config.prefix + cmd.name)) cmd.func(bot, args, argtable)
        })
    })
}
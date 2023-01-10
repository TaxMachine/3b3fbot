const 
    {MessageEmbed} = require("discord.js"),
    {argumentsTable} = require('../../index'),
    {SlashCommandBuilder} = require('@discordjs/builders'),
    config = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("onlines")
        .setDescription("Gives you a list of online players from the minecraft server"),
    run: async(client, interaction) => {
        var players = Object.keys(argumentsTable.bot.players)
        const onlines = new MessageEmbed()
            .setColor("GREEN")
            .setTitle(`Online players on ${config.host}:${config.port}`)
            .setDescription(`\`\`\`\n${players.join('\n')}\n\`\`\``)
        interaction.reply({ embeds: [onlines] })
    }
}
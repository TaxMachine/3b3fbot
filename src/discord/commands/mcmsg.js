const
    {MessageEmbed} = require('discord.js'),
    {argumentsTable} = require('../../index'),
    {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mcmsg")
        .setDescription("same thing as in-game /minecraft:msg but from discord")
        .addStringOption(option =>
            option.setName('username')
                .setDescription("Username of the player you want to msg (use /onlines to see active players)")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("message")
                .setDescription("The message you want to send")
                .setRequired(true)
        ),
    run: async(client, interaction) => {
        var player = interaction.options.getString('username')
        if (!Object.keys(argumentsTable.bot.players).includes(player)) return interaction.reply({content: "This player is not online", ephemeral: true})
        argumentsTable.bot.chat(`/minecraft:msg ${player} [Discord] ${interaction.member.user.username} > ${interaction.options.getString('message')}`)
        const embed = new MessageEmbed()
            .setTitle("Minecraft:msg")
            .setDescription(`you -> ${player}: ${interaction.options.getString("message")}`)
        interaction.reply({embeds: [embed], ephemeral: true})
    }
}
const
    {argumentsTable} = require('../../index'),
    {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("msg")
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
        argumentsTable.bot.whisper(player, interaction.options.getString('message'))
        interaction.reply({content: `you -> ${player}: ${interaction.options.getString("message")}`, ephemeral: true})
    }
}
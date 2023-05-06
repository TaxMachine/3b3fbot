const {readdirSync} = require('fs')

module.exports = async function(client, bot) {
    client.on("interactionCreate", async(interaction) => {
        let client = interaction.client
        if (!interaction.isCommand()) return
        if (interaction.member.bot) return
        //if (!interaction.member.roles.cache.has("1055506853880135710")) return
        readdirSync(`${__dirname}/../commands/`).forEach(file => {
            const cmd = require(`../commands/${file}`)
            if (interaction.commandName.toLowerCase() === cmd.data.name.toLowerCase()) {
                cmd.run(client, interaction)
            }
        })
    })
}
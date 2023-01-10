const {readdirSync} = require('fs')

function djsCommands(client) {
    const commands = [];
    readdirSync(`${__dirname}/commands`).forEach(async file => {
        const command = require(`${__dirname}/commands/${file}`);
        commands.push(command.data.toJSON());
        client.commands.set(command.data.name, command);
    })
    return commands
}

module.exports = {
    djsCommands
}
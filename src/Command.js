const
    {readdirSync} = require('fs')

function commands() {
    var things = [], cmd = []
    readdirSync(`${__dirname}/commands/`).forEach(file => things.push(`${__dirname}/commands/${file}`))
    var cmds = things.map(require)
    cmds.forEach(c => cmd.push({name: c.name, func: c.func, description: c.description, syntax: c.syntax}))
    return cmd
}

module.exports = {commands}
const {readdirSync} = require('fs')

function djsevents() {
    var things = []
    readdirSync(`${__dirname}/discord/events/`).forEach(file => things.push(`${__dirname}/discord/events/${file}`))
    return things.map(require)
}

module.exports = {
    djsevents
}
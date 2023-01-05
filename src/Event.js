const {readdirSync} = require('fs')

function events() {
    var things = []
    readdirSync(`${__dirname}/events/`).forEach(file => things.push(`${__dirname}/events/${file}`))
    return things.map(require)
}

module.exports = {events}
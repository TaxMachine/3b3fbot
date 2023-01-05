const 
    mineflayer = require('mineflayer'),
    webhook = require('./functions/webhook'),
    config = require('./config.json'),
    minecraft = require('./functions/username'),
    sqlite = require('sqlite3'),
    db = new sqlite.Database(`${__dirname}/penis.db`),
    {commands} = require('./Command.js'),
    fs = require('fs'),
    {log} = require('./logger'),
    {events} = require('./Event')
var tps = require('./functions/tps').TPS


db.run(`CREATE TABLE IF NOT EXISTS players (
    username text not null,
    uuid text not null,
    joinedAt text not null,
    PRIMARY KEY(uuid)
)`)
db.run(`CREATE TABLE IF NOT EXISTS playerinfo (
    uuid text not null,
    ping text not null,
    lastseenpos text,
    lastseentime text not null,
    PRIMARY KEY(uuid)
)`)
fs.existsSync(`${__dirname}/logs`) ? null : fs.mkdirSync(`${__dirname}/logs`)
fs.existsSync(`${__dirname}/chatlogs`) ? null : fs.mkdirSync(`${__dirname}/chatlogs`)
if (!fs.existsSync(`${__dirname}/config.json`)) {
    console.log("config file not found, ")
    fs.writeFileSync(JSON.stringify({
        webhook: "BRIDGE URL",
        prefix: "!",
        host: ""
    }))
    process.exit(1)
}
const sleep = ms => new Promise(resovle => setTimeout(resovle, ms));

const reconnect = async() => {
    await sleep(2000)
    initBot()
}
var argumentsTable = {
    tps: 0,
    db: db
}
const initBot = () => {
    var bot = mineflayer.createBot({
        host: config.host,
        username: "feurbot"
    })
    bot.loadPlugin(tps)
    events().forEach(event => {
        event(bot, argumentsTable)
    })
}
setTimeout(() => initBot(), 2000)

module.exports = {reconnect}
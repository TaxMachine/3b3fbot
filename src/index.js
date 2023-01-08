const 
    mineflayer = require('mineflayer'),
    config = require('./config.json'),
    sqlite = require('sqlite3'),
    death = require('mineflayer-death-event'),
    discord = require('discord.js'),
    fs = require('fs'),
    client = new discord.Client(),
    tps = require('./functions/tps').TPS,

    db = new sqlite.Database(`${__dirname}/penis.db`),
    {commands} = require('./minecraft/Command.js'),
    {log} = require('./logger'),
    {events} = require('./minecraft/Event'),
    {djsevents} = require('./discord/Event')


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
db.run(`CREATE TABLE IF NOT EXISTS killcount (
    uuid text not null,
    kill int,
    death int,
    PRIMARY KEY(uuid)
)`)
db.run(`CREATE TABLE IF NOT EXISTS joindates (
    uuid text not null,
    playtime text not null,
    PRIMARY KEY(uuid)
)`)
fs.existsSync(`${__dirname}/logs`) ? null : fs.mkdirSync(`${__dirname}/logs`)
fs.existsSync(`${__dirname}/chatlogs`) ? null : fs.mkdirSync(`${__dirname}/chatlogs`)
if (!fs.existsSync(`${__dirname}/config.json`)) {
    console.log("config file not found")
    fs.writeFileSync(JSON.stringify({
        webhook: "BRIDGE URL",
        prefix: "!",
        host: "",
        port: 25565
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
    db: db,
    timestamps: []
}
const initBot = () => {
    var bot = mineflayer.createBot({
        host: config.host,
        port: config.port,
        username: config.username,
        auth: 'microsoft'
    })
    bot.loadPlugin(tps)
    bot.loadPlugin(death)
    events().forEach(event => {
        event(bot, argumentsTable)
    })
    djsevents().forEach(event => {
        event(client, bot)
    })
}
client.login(config.token)
setTimeout(() => initBot(), 2000)

module.exports = {reconnect}
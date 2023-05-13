const 
    mineflayer = require('mineflayer'),
    config = require('./config.json'),
    database = require('./functions/database'),
    death = require('mineflayer-death-event'),
    {Client, Intents, Collection} = require('discord.js'),
    fs = require('fs'),
    client = new Client({
        intents: [
            Intents.FLAGS.GUILDS, 
            Intents.FLAGS.GUILD_MEMBERS, 
            Intents.FLAGS.GUILD_BANS, 
            Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, 
            Intents.FLAGS.GUILD_INTEGRATIONS, 
            Intents.FLAGS.GUILD_WEBHOOKS, 
            Intents.FLAGS.GUILD_INVITES, 
            Intents.FLAGS.GUILD_VOICE_STATES, 
            Intents.FLAGS.GUILD_PRESENCES, 
            Intents.FLAGS.GUILD_MESSAGES, 
            Intents.FLAGS.GUILD_MESSAGE_REACTIONS, 
            Intents.FLAGS.GUILD_MESSAGE_TYPING, 
            Intents.FLAGS.DIRECT_MESSAGES, 
            Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, 
            Intents.FLAGS.DIRECT_MESSAGE_TYPING, 
            Intents.FLAGS.GUILD_SCHEDULED_EVENTS
        ]
    }),
    {REST} = require('@discordjs/rest'),
    {Routes} = require('discord-api-types/v9'),
    rest = new REST({version: '9'}).setToken(config.token)
    tps = require('./functions/tps').TPS,

    db = new database(`${__dirname}/databases/${config.host}.db`),
    {events} = require('./minecraft/Event'),
    {djsevents} = require('./discord/Event'),
    {djsCommands} = require('./discord/Command')

db.initDB()

fs.existsSync(`${__dirname}/logs`) ? null : fs.mkdirSync(`${__dirname}/logs`)
fs.existsSync(`${__dirname}/chatlogs`) ? null : fs.mkdirSync(`${__dirname}/chatlogs`)
if (!fs.existsSync(`${__dirname}/config.json`)) {
    console.log("config file not found")
    fs.writeFileSync(JSON.stringify({
        webhook: "BRIDGE URL",
        prefix: "!",
        host: "",
        port: 25565,
        username: "MAIL",
        token: "DISCORD BOT TOKEN"
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
    timestamps: [],
    players: [],
    client: client
}


const initBot = async() => {
    var bot = mineflayer.createBot({
        host: config.host,
        port: config.port,
        username: config.username,
        auth: 'microsoft'
    })
    client.commands = new Collection()
    bot.loadPlugin(tps)
    bot.loadPlugin(death)
    argumentsTable.bot = bot
    events().forEach(event => {
        event(bot, argumentsTable)
    })
    djsevents().forEach(event => {
        event(client, bot)
    })
    var commands = djsCommands(client)
    rest.put(
            Routes.applicationCommands(client.user.id),
            {body: commands }
        ).then(() => console.log(commands))
        .catch(console.error)
}
client.login(config.token)
setTimeout(() => initBot(), 2000)

module.exports = {reconnect, argumentsTable}
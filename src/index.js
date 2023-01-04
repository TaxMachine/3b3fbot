const 
    mineflayer = require('mineflayer'),
    webhook = require('../functions/webhook'),
    config = require('./config.json'),
    minecraft = require('../functions/username'),
    sqlite = require('sqlite3'),
    db = new sqlite.Database(`${__dirname}/penis.db`),
    CMD = require('./Command.js'),
    fs = require('fs'),
    {log} = require('./logger')
var tps = require('../functions/tps').TPS


db.run(`CREATE TABLE IF NOT EXISTS players (
    username text not null,
    uuid text not null,
    joinedAt text not null,
    PRIMARY KEY(uuid)
)`)
fs.existsSync(`${__dirname}/logs`) ? null : fs.mkdirSync(`${__dirname}/logs`)
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
        //password: ""
    })
    bot.loadPlugin(tps)
    bot.on('message', async(jsonmsg, position, sender, verified) => {
        //await webhook.wsend(config.webhook, message, message.sender)
        if (jsonmsg.translate == "multiplayer.player.joined" && jsonmsg.with[0].text !== bot.username) {
            var 
                player = jsonmsg.with[0].text,
                joinedAt = Date.now().toString(),
                uuid = await minecraft.username2uuid(player)
            console.log(joinedAt)
            db.run(`INSERT INTO players (username, uuid, joinedAt) VALUES (
                $username,
                $uuid,
                $joinedAt
            )`, {
                $username: player,
                $uuid: uuid,
                $joinedAt: joinedAt
            }, (err) => {})
            
        }
        //if (sender == minecraft.username2uuid(bot.username)) return
        if (jsonmsg.with.length == 1) return
        if (jsonmsg.translate !== "chat.type.text") return
        if (!jsonmsg.with[1].text.startsWith(config.prefix)) return
        var 
            msg = jsonmsg.with[1].text,
            args = msg.split(" ")
        CMD.commands().forEach(cmd => {
            if (msg.startsWith(config.prefix + cmd.name)) cmd.func(bot, args, argumentsTable)
        })
    })
    bot.on("login", async() => {
        console.log("connected to server")
    })
    bot.on("time", async() => {
        argumentsTable.tps = bot.getTps()
    })
    bot.on('kicked', (reason, loggedin) => {
        log(reason)
        console.log("kicked from the server")
        reconnect()
    })
    bot.on('error', async(error) => {
        log(error)
        console.log("error", error)
        reconnect()
    })
}
setTimeout(() => initBot(), 2000)
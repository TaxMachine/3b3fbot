const 
    {reconnect} = require("../index"),
    {log} = require('../logger')

module.exports = async function(bot, argtable) {
    bot.on('kicked', async(reason, loggedin) => {
        log(reason)
        console.log("kicked from the server")
        setTimeout(() => reconnect(), 2000)
    })
}
const 
    {reconnect} = require('../../index'),
    {log} = require('../../logger')

module.exports = async function(bot, argtable) {
    bot.on('error', async(error) => {
        log(error)
        console.log("error", error)
        setTimeout(() => reconnect(), 2000)
    })
}
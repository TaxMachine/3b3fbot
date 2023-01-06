const 
    {DEATH_ENTITY_TYPE_MOB, DEATH_ENTITY_TYPE_PLAYER} = require('mineflayer-death-event'),
    {addPlayerKill, addPlayerDeath} = require('../functions/database')

module.exports = async function(bot, argtable) {
    bot.on("playerDeath", async(data) => {
        console.log(data)
        if (data.offender && data.offender.id && data.offender.type === "player") addPlayerKill(data.offender)
        if (data.victim.id) addPlayerDeath(data.victim)
    })
}
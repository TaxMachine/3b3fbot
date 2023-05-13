const 
    {djsCommands} = require('../Command'),
    {argumentsTable} = require('../../index'),
    { Routes } = require('discord-api-types/v9'),
    config = require('../../config.json')

module.exports = async function(client, bot) {
    client.on("ready", async() => {
        console.log(`Logged on ${client.user.username}`)
        
    })
}
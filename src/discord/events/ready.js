module.exports = async function(client, bot) {
    client.on("ready", async() => {
        console.log(`Logged on ${client.user.username}`)
    })
}
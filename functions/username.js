const axios = require('axios')

async function username2uuid(username) {
    var uuid = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${username}`)
    return await uuid.data.id
}
async function uuid2username(uuid) {
    var username = await axios.get(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`)
    return await username.data.name
}

const mcavatar = (uuid) => `https://crafatar.com/avatars/${uuid}.png`

module.exports = {
    username2uuid,
    uuid2username,
    mcavatar
}
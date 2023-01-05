const 
    sqlite3 = require('sqlite3'),
    db = new sqlite3.Database(`${__dirname}/../src/penis.db`),
    {username2uuid} = require('./username')

const 
    addPlayerJoin = async(username, uuid, joinedAt) => {
        db.run(`INSERT INTO players (username, uuid, joinedAt) VALUES (
            $username,
            $uuid,
            $joinedAt
        )`, {
            $username: username,
            $uuid: uuid,
            $joinedAt: joinedAt
        }, (err) => {})
    },
    parseCoordinates = async(player) => {
        return {
            x: Math.round(parseFloat(player.entity.position.x)),
            y: Math.round(parseFloat(player.entity.position.y)),
            z: Math.round(parseFloat(player.entity.position.z))
        }
    },
    playerUpdate = async(player) => {
        var coords = player.entity ? JSON.stringify(await parseCoordinates(player)) : ""
        db.run(`INSERT INTO playerinfo VALUES (
            $uuid,
            $ping,
            $lastseen
        )`, {
            $uuid: await username2uuid(player.username),
            $ping: player.ping,
            $lastseen: coords
        }, async(err) => {
            if (err) {
                db.run(`UPDATE playerinfo
                SET ping = $ping, lastseen = $lastseen
                WHERE uuid = $uuid`, {
                    $ping: player.ping,
                    $uuid: await username2uuid(player.username),
                    $lastseen: coords
                }, (err) => {})
            }
        })
    }

module.exports = {
    addPlayerJoin,
    playerUpdate
}

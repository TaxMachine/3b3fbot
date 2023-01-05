const 
    sqlite3 = require('sqlite3'),
    db = new sqlite3.Database(`${__dirname}/../penis.db`),
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
            $lastseenpos,
            $lastseentime
        )`, {
            $uuid: await username2uuid(player.username),
            $ping: player.ping,
            $lastseenpos: coords,
            $lastseentime: Date.now().toString()
        }, async(err) => {
            if (err) {
                db.run(`UPDATE playerinfo
                SET ping = $ping, lastseenpos = $lastseenpos, lastseentime = $lastseentime
                WHERE uuid = $uuid`, {
                    $ping: player.ping,
                    $uuid: await username2uuid(player.username),
                    $lastseenpos: coords,
                    $lastseentime: Date.now().toString()
                }, (err) => {})
            }
        })
    }

module.exports = {
    addPlayerJoin,
    playerUpdate
}

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
            $uuid: player.uuid.replace(/-/g, ""),
            $ping: player.ping,
            $lastseenpos: coords,
            $lastseentime: Date.now().toString()
        }, async(err) => {
            if (err) {
                db.run(`UPDATE playerinfo
                SET ping = $ping, lastseenpos = $lastseenpos, lastseentime = $lastseentime
                WHERE uuid = $uuid`, {
                    $ping: player.ping,
                    $uuid: player.uuid.replace(/-/g, ""),
                    $lastseenpos: coords,
                    $lastseentime: Date.now().toString()
                }, (err) => {})
            }
        })
    },
    addPlayerKill = async(offender) => {
        db.run(`INSERT INTO killcount (uuid, kill) VALUES (
            $uuid,
            $kill
        )`, {
            $uuid: offender.id.replace(/-/g, ""),
            $kill: 1
        }, (err) => {
            if (err) {
                db.run(`UPDATE killcount
                SET kill = kill + 1
                WHERE uuid = $uuid`, {
                    $uuid: offender.id.replace(/-/g, "")
                }, (err) => {})
            }
        })
    },
    addPlayerDeath = async(victim) => {
        db.run(`INSERT INTO killcount (uuid, death) VALUES (
            $uuid,
            $death
        )`, {
            $uuid: victim.id.replace(/-/g, ""),
            $death: 1
        }, (err) => {
            if (err) {
                db.run(`UPDATE killcount
                SET death = death + 1
                WHERE uuid = $uuid`, {
                    $uuid: victim.id.replace(/-/g, "")
                }, (err) => {})
            }
        })
    }

module.exports = {
    addPlayerJoin,
    playerUpdate,
    addPlayerKill,
    addPlayerDeath
}

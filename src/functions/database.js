const 
    sqlite3 = require('sqlite3')

class Database {
    constructor(file) {
        this.db = new sqlite3.Database(file)
    }

    initDB() {
        this.db.run(`CREATE TABLE IF NOT EXISTS players (
            username text not null,
            uuid text not null,
            joinedAt text not null,
            PRIMARY KEY(uuid)
        )`)
        this.db.run(`CREATE TABLE IF NOT EXISTS playerinfo (
            uuid text not null,
            ping text not null,
            lastseenpos text,
            lastseentime text not null,
            PRIMARY KEY(uuid)
        )`)
        this.db.run(`CREATE TABLE IF NOT EXISTS killcount (
            uuid text not null,
            kill int,
            death int,
            PRIMARY KEY(uuid)
        )`)
        this.db.run(`CREATE TABLE IF NOT EXISTS joindates (
            uuid text not null,
            playtime text not null,
            PRIMARY KEY(uuid)
        )`)
    }

    addPlayerJoin = async(username, uuid, joinedAt) => {
        this.db.run(`INSERT INTO players (username, uuid, joinedAt) VALUES (
            $username,
            $uuid,
            $joinedAt
        )`, {
            $username: username,
            $uuid: uuid,
            $joinedAt: joinedAt
        }, (err) => {
            console.log(err)
        })
    }

    parseCoordinates = async(player) => {
        return {
            x: Math.round(parseFloat(player.entity.position.x)),
            y: Math.round(parseFloat(player.entity.position.y)),
            z: Math.round(parseFloat(player.entity.position.z))
        }
    }

    playerUpdate = async(player) => {
        var coords = player.entity ? JSON.stringify(await parseCoordinates(player)) : ""
        this.db.run(`INSERT INTO playerinfo VALUES (
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
                this.db.run(`UPDATE playerinfo
                SET ping = $ping, lastseenpos = $lastseenpos, lastseentime = $lastseentime
                WHERE uuid = $uuid`, {
                    $ping: player.ping,
                    $uuid: player.uuid.replace(/-/g, ""),
                    $lastseenpos: coords,
                    $lastseentime: Date.now().toString()
                }, (err) => {
                    console.log(err)
                })
            }
        })
    }

    addPlayerKill = async(offender) => {
        this.db.run(`INSERT INTO killcount (uuid, kill) VALUES (
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
                }, (err) => {
                    console.log(err)
                })
            }
        })
    }

    addPlayerDeath = async(victim) => {
        this.db.run(`INSERT INTO killcount (uuid, death) VALUES (
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
                }, (err) => {
                    console.log(err)
                })
            }
        })
    }

    db = this.db
}

module.exports = Database

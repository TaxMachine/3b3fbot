module.exports = async function(bot, argtable) {
    bot.on("playerLeft", async(player) => {
        var
            timestamps = argtable.timestamps,
            uuid = player.uuid.replace(/-/g, "")

        for (let i = 0; i < timestamps.length; i++) {
            if (timestamps[i].uuid == uuid && timestamps.join != null) {
                timestamps[i].leave = new Date().getTime()
                console.log(timestamps)
                var totalms = timestamps[i].leave - timestamps[i].join
                argtable.db.run(`INSERT INTO joindates VALUES (
                    $uuid,
                    $ms
                )`, {
                    $uuid: uuid,
                    $ms: totalms
                }, (err) => {
                    if (err) {
                        argtable.db.run(`UPDATE joindates
                        SET playtime = playtime + $newplaytime
                        WHERE uuid = $uuid`, {
                            $newplaytime: totalms,
                            $uuid: uuid
                        }, (err) => {})
                    }
                })
            }
        }
    })
}
const sqlite = require('sqlite3').verbose(), db = new sqlite.Database(`${__dirname}/../src/penis.db`)

function getjd(username) {
    var jde = ""
    db.get(`SELECT joinedAt, username FROM players WHERE username = $username`, {$username: username}, (err, row) => {
        if (err) return
        jde = row   
    })
    return jde
}

console.log(getjd("Anchor_Aura"))
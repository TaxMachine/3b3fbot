const fetch = require('node-fetch')

const wsend = async(url, message, avatar, wname) => {
    await fetch(url, {
        method: "POST",
        Headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            avatar: avatar,
            username: wname,
            content: message
        })
    })
}

module.exports = {
    wsend
}
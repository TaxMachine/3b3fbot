const axios = require('axios')

const wsend = async(url, message, avatar, wname) => {
    try {
        var req = await axios({
            url: url,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                avatar: avatar,
                username: wname,
                content: message
            })
        })
        return req
    } catch (e) {
        console.log(e.msg)
    }
}
const wsendEmbed = async(url, wname, avatar, embed) => {
    try {
        var req = await axios({
            url: url,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                avatar: avatar,
                username: wname,
                embeds: [embed]
            })
        })
        return req
    } catch (e) {
        console.log(e.msg)
    }
    
}

module.exports = {
    wsend,
    wsendEmbed
}
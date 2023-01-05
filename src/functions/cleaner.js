async function clean(message) {
    return message.replace(/-|\\|\/|:|\//g, "")
}

module.exports = {clean}
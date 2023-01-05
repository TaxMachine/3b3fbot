module.exports = async function clean(message) {
    return message.replace(/-|\\|\/|:|\//g, "")
}
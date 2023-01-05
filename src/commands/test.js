module.exports = {
    name: "test",
    syntax: "test",
    description: "Test command",
    func: async function(bot, args, argtable) {
        bot.chat("hello")
    }
}
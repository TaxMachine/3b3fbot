const log = async(message) => {
    var 
        time = new Date(),
        tolog = `[${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}:${time.getMilliseconds()}] ${message}\n`
    require('fs').appendFileSync(`${__dirname}/logs/${time.getFullYear()}-${time.getMonth()}-${time.getDay()}-logs.log`, tolog)
}

module.exports = {log}
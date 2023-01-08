const calculatept = (dif) => {
    let days = Math.floor(dif / 86400)
    dif -= days * 86400
    let hours = Math.floor(dif / 3600)
    dif -= hours * 3600
    let minutes = Math.floor(dif / 60)
    dif -= minutes * 60
    let seconds = dif
    return {days, hours, minutes, seconds}
}

module.exports = {
    calculatept
}
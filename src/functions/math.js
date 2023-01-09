const calculatept = (timeDiff) => {
    let 
        days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
        hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)
    return {days, hours, minutes, seconds}
}

module.exports = {
    calculatept
}
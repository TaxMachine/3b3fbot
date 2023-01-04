const TPS = async(bot) => {
  
    let time = parseInt(bot.time.age);
    const calcTps = [];

    const run = (bot) => {
        time = parseInt(bot.time.age);
        setTimeout(() => {
            const diff = parseInt(bot.time.age) - time;
            calcTps.push(diff);
            if(calcTps.length > 20) {
                calcTps.shift()
            }
            run(bot);
        }, 1000)
    };
    run(bot);
    bot.getTps = () => {
        return calcTps.filter(tps => tps === 20).length
    }
}

module.exports = {TPS}
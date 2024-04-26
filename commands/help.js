module.exports = async (bot, message) => {
    help = []
    bot.commands.forEach(element => {
    help.push(element.names, element.description)
    })
    help = new Set(help)
    s = ''
    b = true
    for (element of help){
        if (b){
            b = false
            s+=`***${element.join('  ')}*** - `
        }else{
            b = true
            s+=(`${element}\n`)
        }
        
    }
    message.channel.send(s)
}
module.exports.names = ['!help']
module.exports.description = 'Список команд'
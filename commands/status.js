module.exports = async (bot, message) => {
    if (!game.started){message.channel.send("Нельзя узнать статус игры пока она не начата"); return}
    let statusMessage = 'Живые игроки: '
    game.players.forEach(player => {
        if(player.life){
            statusMessage+=`${player.userObject.username} `
        }
    });
    message.channel.send(statusMessage)
}
module.exports.names = ['!status', '!статус']
module.exports.description = 'Вывести информацию о текущей игре'
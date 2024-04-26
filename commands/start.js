module.exports = async (bot, message) => {
    next = require('../functions/start_next')
    if (!game.opened){message.channel.send("Нельзя начать игру, пока игроки не собраны! Напишите !mafia");return}
    game.started = true
    game.opened = false
    message.channel.send("Игра началась!\nСледите за личными сообщениями, все взаимодействия будут происходить там")
    let giveRoles = ['mafia', 'doctor', 'commissioner', 'man', 'man', 'man', 'man', 'mafia','man','man','man', 'man']
    game.players.sort(()=>Math.random()-0.5)//рандом, для ролей
    //роли
    let mafiaMessage = ""
    let i = 0
    game.players.forEach(player => {
        player.role = giveRoles[i]
        let role = roles[player.role]
        if (player.role == 'mafia'){mafiaMessage+=`${player.userObject.username} `}
        player.userObject.send(`Твоя роль - ${role.name}\n${role.description}`)
        i++
    });
    game.players.sort(()=>Math.random()-0.5)//рандом для эмоджи
    i = 0
    game.players.forEach(player => {
        player.emoji = gameSettings.emoji[i]
        i++
    })
    //sorted by priority
    game.players.sort((a,b) => {
        if (gameSettings.rolesPriority.indexOf(a.role) > gameSettings.rolesPriority.indexOf(b.role)){
            return 1
        }
        else{return -1}
    })
    //рассылка мафиям, кто мафия
    game.players.forEach(player => {
        if (player.role == 'mafia'){
            player.userObject.send(`Состав мафии: ${mafiaMessage}`)
        }
    })
    next(bot, message)
}
module.exports.names = ['!start', '!старт']
module.exports.description = 'Запуск игры'
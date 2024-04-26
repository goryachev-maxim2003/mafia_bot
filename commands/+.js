module.exports = async (bot,message) => {
    if (!game.opened) {return}
    //один человек не добавлялся 2 раза
    let b = false
    game.players.forEach(player => {
        if (player.userObject.id == message.author.id){message.reply("Тебя уже добавили в игру");b=true}
    });
    if (b) return
    player = Object.assign({}, clearPlayer) //клонирование объекта
    player.userObject = message.author
    player.userObject.send('Привет, ты участник игры')
    game.players.push(player)
} 
module.exports.names = ['+']
module.exports.description = 'Принять участие в игре (работает только после команды !mafia)'
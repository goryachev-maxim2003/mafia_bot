module.exports = async (bot, message) => {
    game = JSON.parse(JSON.stringify(clearGame))//глубокое копирование
    game.opened = true
    message.channel.send("Добро пожаловать в игру Мафия!\nНачинаем сбор игроков, все желающие поиграть пишите +\nКогда игроки соберутся напишите !start")
}
module.exports.names = ['!mafia', '!мафия']
module.exports.description = 'Начало игры: сбор игроков'
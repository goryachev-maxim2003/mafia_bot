module.exports = async (bot, message, param) => {
    if (!param){message.reply("Вы забыли тэгнуть игрока");return}
    if (param.length<3){message.reply("У данного игрока нет статистики");return}
    user_id = param.slice(2,-1)
    // connect.query(`SELECT * FROM players WHERE user_id=${user_id}`, (err, res) => {
    //     if (err) throw err
    //     if (res.length==0){ message.reply("У данного игрока нет статистики")}
    //     else{
    //         message.channel.send(`Общая статистика игрока ${res[0].username}`)
    //         message.channel.send(`\`\`\`игры: ${res[0].games_number}\`\`\``)
    //         message.channel.send(`\`\`\`победы: ${res[0].victories}\`\`\``)
    //         message.channel.send(`\`\`\`поражения: ${res[0].losses}\`\`\``)
    //         message.channel.send(`Статистика по ролям`)
    //         connect.query(`SELECT * FROM player_on_role WHERE players_id=(SELECT id FROM players WHERE user_id=${user_id})`, (err, res) => {
    //             if (err) throw err
    //             res.forEach(el => {
    //                 message.channel.send(`Статистика на роли ${roles[el.role].name}`)
    //                 message.channel.send(`\`\`\`игры: ${el.games_number}\`\`\``)
    //                 message.channel.send(`\`\`\`победы: ${el.victories}\`\`\``)
    //                 message.channel.send(`\`\`\`поражения: ${el.losses}\`\`\``)
    //             });
    //         })
    //     }
    // })
}
module.exports.names = ['!stat', '!стата']
module.exports.description = 'Вывести статистику игрока(имеется параметр @username)'
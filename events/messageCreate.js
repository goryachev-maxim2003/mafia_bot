// module.exports = (bot, message, connect) => {
// 	commandRun = bot.commands.get(message.content.toLowerCase())
// 	if (commandRun) commandRun(bot, message, connect)
// 	.catch(err => console.error(err))
// }
module.exports = (bot, message) => {
	msg = message.content.toLowerCase().split(" ")
	commandRun = bot.commands.get(msg[0])
	if (commandRun) commandRun(bot, message, msg[1])
	.catch(err => console.error(err))
}
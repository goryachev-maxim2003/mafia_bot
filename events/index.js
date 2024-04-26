module.exports = (bot) => {
bot
.once('ready', () => require('./ready')(bot))
.on('messageCreate', (message) => require('./messageCreate')(bot, message))
.on('messageReactionAdd', (messageReaction,user) => require('./messageReactionAdd')(bot,messageReaction,user))
}

module.exports = (bot, messageReaction, user) => {
	if (user.bot) {return}	
	//голосование
	if (game.voting){
		if (messageReaction.message.id != game.votingMessage.id){return}
		game.players.forEach(player => {
			if (player.userObject.id == user.id && player.life){
				let i = 0
				while (i!=game.players.length && game.players[i].emoji != messageReaction.emoji.name){
					i++
				}
				player.voteSelectedPlyerId = i
			}
		})
	}
	//doings
	else{
		game.players.forEach(player => {
			if (messageReaction.message.id == player.doMessage.id && player.life){
				let i = 0
				while (game.players[i].emoji != messageReaction.emoji.name){
					i++
				}
				player.selectedPlyerId = i
			}
		})
	}
}
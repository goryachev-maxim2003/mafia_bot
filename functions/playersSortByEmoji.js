module.exports = function playersSortByEmoji(){
    playersSortedByEmoji = JSON.parse(JSON.stringify(game)).players//new
    playersSortedByEmoji.sort((a,b) => {
        if (gameSettings.emoji.indexOf(a.emoji) > gameSettings.emoji.indexOf(b.emoji)){
            return 1
        }
        else{return -1}
    })
    return playersSortedByEmoji
}
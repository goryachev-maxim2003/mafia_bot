module.exports = ()=>{
roles["mafia"].do = function(id, user){
    game.players[id].life = false
}
roles["doctor"].do = function(id, user){
    game.players[id].life = true
}
roles["commissioner"].do = function(id, user){
    if (game.players[id].role == "mafia"){user.send("Он мафия")}
    else {user.send("Он не мафия")}
}
}
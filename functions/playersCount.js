module.exports = ()=>{
    let count = 0
    game.players.forEach(player => {
        if (player.life){count++}
    })
    return count
}
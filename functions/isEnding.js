module.exports = (message)=>{ 
    
    let redWin = true
    let blackWin = true
    game.players.forEach(player => {
        if (player.life){
            if (player.role=="mafia"){redWin = false}
            else {blackWin = false}
        }
    })
    
    //database
    /*
    //функция увеличения параметра игрока на 1
    function increaseParameter(parameter, table, player){
        if (table=="players"){
        connect.query(`UPDATE ${table} SET ${parameter}=${parameter}+1 WHERE user_id=${player.userObject.id}`, (err) => {
            if (err) throw err
        })
        }
        else if (table=="player_on_role"){
        connect.query(`UPDATE ${table} SET ${parameter}=${parameter}+1 WHERE players_id=(SELECT id FROM players WHERE user_id=${player.userObject.id})`, (err) => {
            if (err) throw err
        })
        }
    }
    //запись статистики
    function update(player, table){
        increaseParameter("games_number", table, player)
        if (redWin){
            if (player.role=='mafia'){
                increaseParameter("losses", table, player)
            } 
            else {
                increaseParameter("victories", table, player)
            }
        } 
        else {//blackWin
            if (player.role=='mafia'){
                increaseParameter("victories", table, player)
            }
            else {
                increaseParameter("losses", table, player)
            }
        }
    }
    //заполнение статистики по ролям
    function updateRole(player){
        connect.query(`SELECT r.id FROM player_on_role r, players p WHERE r.role = "${player.role}" AND p.user_id = ${player.userObject.id} AND r.players_id = p.id`, (err, res) => {
            if (err) throw err
            if (res.length!=0){
                update(player, "player_on_role")
            }
            else{//если человека нет в базе
                connect.query(`SELECT id FROM players WHERE user_id = ${player.userObject.id}`, (err, res) => {
                    if (err) throw err
                    connect.query(`INSERT INTO player_on_role (role, games_number, victories, losses, players_id)
                    VALUES('${player.role}',0,0,0,${res[0].id})`, (err) => {
                        if (err) throw err
                        update(player, "player_on_role")
                    })
                })
            }
        })
    }
    if (redWin || blackWin){
        game.players.forEach(player => {  
        //заполнение общей статистики  
        connect.query(`SELECT id FROM players WHERE user_id=${player.userObject.id}`, (err, res) => {
            if (err) throw err
            if (res.length!=0){
                update(player, "players")
                updateRole(player)
            }
            else{//если человека нет в базе
                connect.query(`INSERT INTO players (username, games_number, victories, losses, user_id)
                VALUES('${player.userObject.username}',0,0,0,${player.userObject.id})`, (err) => {
                    if (err) throw err
                    update(player, "players")
                    updateRole(player)
                })
            }
            })
        })
    }
    */
    //stop game
    if (redWin){message.channel.send(gameSettings.redWinPhrase);game.started = false; return true}
    else if (blackWin){message.channel.send(gameSettings.blackWinPhrase);game.started = false; return true}
    else {return false}
}

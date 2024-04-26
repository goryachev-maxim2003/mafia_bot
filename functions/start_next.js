module.exports = function next(bot, message){
    if (!game.started){message.channel.send("Нельзя начать новый день, пока игра не начата");return}
    message.channel.send("Начинается новый день")
    isEnding = require("./isEnding")//проверка на конец игры
    playersSortByEmoji = require("./playersSortByEmoji")//новый массив отсортированный по эмоджи
    //рассылка на ночь
    game.players.forEach(player => {
        if (roles[player.role].doPhrase && player.life){
            //обнуление выбора
            player.preSelectedPlyerId = player.selectedPlyerId
            player.selectedPlyerId = -1
            player.voteSelectedPlyerId = -1
            //Рассылка сообщений с реакциями
            player.userObject.send(roles[player.role].doPhrase)
            .then((message) => {
                player.doMessage = message
                playersSortByEmoji().forEach(player => {
                    if (player.life){
                        message.react(player.emoji)
                        message.channel.send(`${player.emoji} - ${player.userObject.username}`)
                    }
                })
            })
        }
    })
    //все ответили + вся мафия одинаково выбрала
    selectionCheckInterval = setInterval(() => {
        let allSelected = true
        let MafiaSelectedIndex = game.players.filter(player => player.life)[0].selectedPlyerId//первый живой человек - мафия, т. к отсортировано. Мафия 100% будет в игре
        let mafiaSelected = true
        let doctorRightSelected = true
        let doctor;
        for (let i = 0; i<game.players.length; i++) {
            let player = game.players[i]
            if (player.selectedPlyerId == -1 && roles[player.role].doPhrase && player.life){
                allSelected = false
                break
            }
            if (player.role == 'mafia' && player.selectedPlyerId!=MafiaSelectedIndex && player.life){
                mafiaSelected = false
            }
            if ((player.role == 'doctor' && player.selectedPlyerId==player.preSelectedPlyerId) && (player.selectedPlyerId==i && player.life)){
                doctorRightSelected=false
                doctor = player.userObject
            }
        }
        //все ответили и совпадение у мафии
        if (allSelected) {
        if (mafiaSelected){
        if (doctorRightSelected){
            //doings
            let beforeCount = playersCount()
            //запоминаем индексы
            let doIndexes = []
            doIndexes.push(["mafia", MafiaSelectedIndex, null])
            game.players.forEach((player) => {
                if (player.life && roles[player.role].doPhrase && player.role!='mafia'){
                    doIndexes.push([player.role, player.selectedPlyerId, player.userObject])
                }
            })
            doIndexes.forEach(x=>{roles[x[0]].do(x[1], x[2])}) //выполняем
            //!!!дон
            //информация о ночи
            if (beforeCount == playersCount()){message.channel.send(gameSettings.survivedPhrase)}
            else{message.channel.send(`${gameSettings.killedPhrase} ${game.players[MafiaSelectedIndex].userObject.username}`)}
            clearInterval(selectionCheckInterval)
            if (isEnding(message)){return}//проверка на конец игры
            //голосование
            message.channel.send(gameSettings.votingPhrase)
                .then((message) => {
                    game.votingMessage = message
                    playersSortByEmoji().forEach(player => {
                        if (player.life){
                            message.react(player.emoji)
                            message.channel.send(`${player.emoji} - ${player.userObject.username}`)
                        }
                    })
                    let noVoteEmoji = gameSettings.emoji[game.players.length]//без +1 тк длинна на 1 больше индекса
                    message.react(noVoteEmoji)
                    message.channel.send(`${noVoteEmoji} - Воздержаться от голоса`)
                })
            game.voting = true
            //все ли проголосовали + результат голосования
            votingInterval = setInterval(() => {
                let allVoting = true
                let vote = new Array(game.players.length+1).fill(0)//+1 из за возможности отказаться голосовать
                game.players.forEach(player =>{
                    if (player.life){
                        if (player.voteSelectedPlyerId!=-1){
                            vote[player.voteSelectedPlyerId]++
                        }
                        else {allVoting = false}
                    }
                })
                if (allVoting){
                    let max = Math.max.apply(null,vote)
                    if (!(vote.filter(x => x==max).length>1) && max!=vote[vote.length-1]){ //если люди определились кого выгнать
                        let kickedPlayer = game.players[vote.indexOf(max)]
                        kickedPlayer.life = false
                        message.channel.send(`был выгнан игрок - ${kickedPlayer.emoji} ${kickedPlayer.userObject.username}`)
                    }
                    else {message.channel.send('Никто из игроков не был выгнан')}

                    game.voting = false
                    clearInterval(votingInterval)
                    if (!(isEnding(message))){next(bot, message)}
                }
            }, 5_000)
        } else {
            //рассылка доктору
            doctor.send("Смени выбор! Нельзя вылечить себя 2 раза подряд")  
        } } else {
            //рассылка мафии
            game.players.forEach((player) => {
                if (player.role == 'mafia' && player.life){player.userObject.send("Ответы мафии не совпадают")}
            })
        }
        }
    }, 5_000)
}
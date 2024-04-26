const { Client, Collection } = require('discord.js')
const {token, cfg} = require('./config.json')
fs = require('fs')
//database

// const mysql = require('mysql')
// const connect  = mysql.createConnection({
//     host:"127.0.0.1",
//     port:"3307",
//     user:"root",
//     database:"mafia",
//     password:"root",
// })

// connect.connect(err => {
//     if (err) throw err
//     else console.log("database connection start")
// })

//start bot
const bot = new Client(cfg)
bot.login(token)

//data
clearGame = require('./data/game.json')
clearPlayer = require('./data/player.json')
gameSettings = require('./data/gameSettings.json')
roles = gameSettings.roles
game = JSON.parse(JSON.stringify(clearGame))//глубокое копирование
require('./data/doings')()
//events
require('./events/index')(bot)
//commands
bot.commands = new Collection()
const commandFiles = fs.readdirSync('./commands')
for (file of commandFiles){
    command = require(`./commands/${file}`)
    command.names.forEach(element => {
        bot.commands.set(element, command)
    });
}
//functions
playersCount = require("./functions/playersCount")
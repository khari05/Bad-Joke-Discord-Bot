const disc = require("discord.js")
const fs = require("fs")
const client = new disc.Client()

const token = process.env.token
const channels = fs.readFileSync('channels.txt').toString().split("\n")
const botId = process.env.botId.toString()

client.on("ready", () => {
    client.user.setPresence({activity: {name: "your bad memes since 2020", type:"WATCHING"}})
    console.log(`Logged in as ${client.user.tag}`)
})

client.on('message', msg => {
    if (msg.attachments.size > 0 && channels.indexOf(msg.channel.id) !== -1 && msg.author.id !== botId) {
        msg.channel.send({ 
            files: [{
                attachment: './bad-joke.png',
                name: 'bad-joke.png'
            }]
        })
    }
})

client.login(token)
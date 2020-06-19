const disc = require("discord.js")
const client = new disc.Client()

const token = process.env.token
const channelId = process.env.channelId.toString()
const botId = process.env.botId.toString()

client.on("ready", () => {
    client.user.setPresence({activity: {name: "your bad memes since 2020", type:"WATCHING"}})
    console.log(`Logged in as ${client.user.tag}`)
})

client.on('message', msg => {
    if (msg.attachments.size > 0 && msg.channel.id === channelId && msg.author.id !== botId) {
        msg.channel.send({ 
            files: [{
                attachment: './bad-joke.png',
                name: 'bad-joke.png'
            }]
        })
    }
})

client.login(token)
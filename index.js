const disc = require("discord.js")
const fs = require("fs")
const client = new disc.Client()

const token = process.env.token
const channels = fs.readFileSync("channels.txt").toString().split("\n")
const ownerId = process.env.ownerId.toString()
 
let botOwner;

client.on("ready", () => {
    client.user.setPresence({activity: {name: "your bad memes since 2020", type:"WATCHING"}})
    console.log(`Logged in as ${client.user.tag}`)
    client.users.fetch(ownerId, true)
    botOwner = client.users.cache.get(ownerId)
})

client.on('message', msg => {
    if (msg.attachments.size > 0 && channels.indexOf(msg.channel.id) !== -1 && !msg.author.bot) {
        msg.channel.send({ 
            files: [{
                attachment: './bad-joke.png',
                name: 'bad-joke.png'
            }]
        })
    }
    if (msg.channel.type === "dm" && !msg.author.bot) {
        botOwner.send(new disc.MessageEmbed({
            author: {
                name: msg.author.tag,
                icon_url: msg.author.avatarURL()
            },
            description: msg.content,
            image: msg.attachments.size !==0 ? {url: msg.attachments.array()[0].url} : null,
        }))
        .catch(e => console.error(e.stack))
        console.log("")
    }
})

client.login(token)
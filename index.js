const disc = require("discord.js")
const fs = require("fs")
const client = new disc.Client()

const token = process.env.token
let channels = fs.readFileSync("channels.txt").toString().split("\n")
const ownerId = process.env.ownerId.toString()
const prefix = "%";
const msgRegex = new RegExp(`^${prefix}.*`)

let botOwner;

client.on("ready", () => {
    client.user.setActivity(`${client.guilds.cache.size} guilds | ${prefix}help`, { type: "WATCHING" })
    console.log(`Logged in as ${client.user.tag}`)
    console.log(`Watching ${client.guilds.cache.size} guilds`)
    client.users.fetch(ownerId, true)
    botOwner = client.users.cache.get(ownerId)
})

client.on("guildCreate", (guild) => {
    console.log(`Joined guild ${guild.name}`)
    client.user.setActivity(`${client.guilds.cache.size} guilds | ${prefix}help`, { type: "WATCHING" })
})

// ! this is almost entirely spaghetti code. doesn't really matter since its just a random side project that nobody will actually use.
client.on('message', (msg) => {
    if (msg.content.search(msgRegex) !== -1) {
        if (msg.guild.member(msg.author).hasPermission("MANAGE_CHANNELS") && msg.content !== `${prefix}help`) {
            if (msg.content === `${prefix}addchannel`) {
                const channelIndex = channels.indexOf(msg.channel.id)
                if (channelIndex === -1) {
                    channels.push(msg.channel.id)
                    msg.channel.send("This channel will now be watched for bad jokes.")
                    fs.writeFileSync("channels.txt", channels.join("\n"))
                } else {
                    msg.channel.send("This channel is already being watched for bad jokes.")
                }
            } else if (msg.content === `${prefix}removechannel`) {
                const channelIndex = channels.indexOf(msg.channel.id)
                if (channelIndex !== -1) {
                    channels.splice(channelIndex, 1)
                    msg.channel.send("This channel will no longer be watched for bad jokes.")
                    fs.writeFileSync("channels.txt", channels.join("\n"))
                } else {
                    msg.channel.send("This channel isn't currently being watched for bad jokes.")
                }
            } else {
                msg.channel.send("Unknown command")
            }
        } else if (msg.content === `${prefix}help`) {
            msg.channel.send(new disc.MessageEmbed({
                title: "Bad Joke Help",
                hexColor: "#FFF59D",
                fields: [
                    {
                        name: `${prefix}help`,
                        value: "returns the help page."
                    },
                    {
                        name: `${prefix}addchannel`,
                        value: "Makes Bad Joke watch this channel for bad jokes."
                    },
                    {
                        name: `${prefix}removechannel`,
                        value: "Makes Bad Joke stop watching this channel for bad jokes."
                    }
                ],
            }))
        } else {
            msg.channel.send("You do not have permission to run that command.")
        }
    } else if ((msg.attachments.size > 0 || msg.embeds.length > 0) && channels.indexOf(msg.channel.id) !== -1 && !msg.author.bot) {
        msg.channel.send({
            files: [{
                attachment: './bad-joke.png',
                name: 'bad-joke.png'
            }]
        })
    } else if (msg.channel.type === "dm" && !msg.author.bot) {
        botOwner.send(new disc.MessageEmbed({
            author: {
                name: msg.author.tag,
                icon_url: msg.author.avatarURL()
            },
            description: msg.content,
            image: msg.attachments.size !== 0 ? { url: msg.attachments.array()[0].url } : null,
        }))
            .catch(e => console.error(e.stack))
        console.log("")
    }
})

client.login(token)
import { updatePresence } from './util/presence'
import { Client } from 'discord.js'
import { manageMessageEvent } from './event/message'
import { ChannelWatcher } from './util/ChannelWatcher'
import { matchSlashCommand } from './event/command'

const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] })

const token = process.env.TOKEN
export const prefix = process.env.PREFIX ?? '%'
const channelWatcher = new ChannelWatcher()

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag ?? 'error'}`)
  updatePresence(client, prefix)
})

client.on('guildCreate', (guild) => {
  updatePresence(client, prefix)
})

client.on('guildDelete', (guild) => {
  updatePresence(client, prefix)
})

client.on('messageCreate', (msg) => {
  manageMessageEvent(msg, channelWatcher)
    .catch((e: Error) => console.error(e.stack))
})

client.on('interaction', (cmd) => {
  if (cmd.isCommand()) {
    matchSlashCommand(cmd, client, channelWatcher)
      .catch((e: Error) => console.error(e.stack))
  }
})

client.login(token)
  .catch(e => console.error(e.stack))

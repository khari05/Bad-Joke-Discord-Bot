import { Client, Message } from 'discord.js'
import { prefix } from '..'
import { ChannelWatcher } from '../util/ChannelWatcher'
import { commandMap } from './command'

export async function manageMessageEvent (msg: Message, client: Client, watcher: ChannelWatcher): Promise<void> {
  const content = msg.content.trim()

  if (content.startsWith(prefix)) {
    const command = commandMap.get(content.slice(1))
    await command?.execute(msg, client, watcher)
    return
  }

  if (watcher.isWatching(msg.channel.id) &&
    !msg.author.bot &&
    (msg.attachments.size > 0 ||
      msg.embeds.length > 0 ||
      msg.content.length > 75)
  ) {
    await msg.channel.send({
      files: [{
        attachment: './bad-joke.png',
        name: 'bad-joke.png'
      }]
    })
  }
}

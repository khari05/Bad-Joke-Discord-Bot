import { Message } from 'discord.js'
import { prefix } from '..'
import { ChannelWatcher } from '../util/ChannelWatcher'

const msgRegex = new RegExp(`^\\${prefix}.*`)

export async function manageMessageEvent (msg: Message, watcher: ChannelWatcher): Promise<void> {
  console.log(msg.content)

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

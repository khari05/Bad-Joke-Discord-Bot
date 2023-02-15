import { Command } from '../event/command'
import { sendMessage } from '../util/send'

export const inviteCommand: Command = {
  name: 'invite',
  description: 'Get the bot\'s invite link',
  async execute (cmd, client, channelWatcher) {
    await sendMessage(cmd,
      `https://discord.com/api/oauth2/authorize?client_id=${client.application?.id ?? ''}&permissions=51200&scope=bot%20applications.commands`,
      true
    )
  }
}

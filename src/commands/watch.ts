import { Client, CommandInteraction, Message } from 'discord.js'
import { Command } from '../event/command'
import { ChannelWatcher } from '../util/ChannelWatcher'
import { sendMessage } from '../util/send'

const MANAGE_CHANNEL_PERMISSION = 16

export const watchChannelCommand: Command = {
  name: 'watch',
  description: 'Toggles Bad Joke in this channel.',
  execute: toggleWatchChannel,
  options: [],
  permissions: MANAGE_CHANNEL_PERMISSION.toString()
}

async function toggleWatchChannel (
  cmd: Message | CommandInteraction,
  client: Client,
  watcher: ChannelWatcher
): Promise<void> {
  if (!cmd.inGuild() || cmd.member == null) {
    await sendMessage(cmd, 'You can\'t activate bad joke in a DM silly!', true)
    return
  }

  let allowed = false

  if (cmd instanceof Message) {
    allowed = cmd.member.permissions.has('MANAGE_CHANNELS')
  } else if (cmd instanceof CommandInteraction) {
    allowed = cmd.memberPermissions.has('MANAGE_CHANNELS')
  }

  if (!allowed) {
    await sendMessage(cmd, 'You don\'t have permission to use that command.', true)
    return
  }

  const channelId = cmd.channelId
  if (watcher.isWatching(channelId)) {
    watcher.removeChannel(channelId)
    await sendMessage(cmd, 'This channel will no longer be watched for bad jokes.', true)
  } else {
    watcher.addChannel(channelId)
    await sendMessage(cmd, 'This channel will now be watched for bad jokes.', true)
  }
}

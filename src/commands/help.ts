import { CommandInteraction, Message, MessageEmbed } from 'discord.js'
import { prefix } from '..'
import { Command, commandMap } from '../event/command'
import { sendMessage } from '../util/send'

export const helpCommand: Command = {
  name: 'help',
  description: 'returns the help page',
  execute: sendHelpEmbed
}

async function sendHelpEmbed (cmd: CommandInteraction | Message): Promise<void> {
  const author = cmd instanceof CommandInteraction ? cmd.user : cmd.author

  const embed = new MessageEmbed({
    title: 'Bad Joke Help',
    timestamp: new Date(),
    color: 16774557,
    footer: {
      text: `Requested by ${author?.tag ?? ''}`,
      icon_url: author?.avatarURL() ?? undefined
    }
  }).addFields(
    Array.from(commandMap.values())
      .map(({ name, description }) => ({ name: prefix + name, value: description, inline: true }))
  )

  await sendMessage(cmd, embed, true)
}

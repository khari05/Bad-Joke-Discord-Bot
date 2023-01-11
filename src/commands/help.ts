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
  const embed = new MessageEmbed({
    title: 'Bad Joke Help',
    timestamp: new Date(),
    color: 16774557
  }).addFields(
    Array.from(commandMap.values())
      .map(({ name, description }) => ({ name: prefix + name, value: description, inline: true }))
  )

  await sendMessage(cmd, embed, true)
}

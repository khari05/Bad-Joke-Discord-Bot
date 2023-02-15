import { ApplicationCommand, ApplicationCommandOptionData, Client, CommandInteraction, Message } from 'discord.js'
import { ChannelWatcher } from '../util/ChannelWatcher'
import { helpCommand } from '../commands/help'
import { watchChannelCommand } from '../commands/watch'
import { inviteCommand } from '../commands/invite'

export const commandMap: Map<string, Command> = new Map<string, Command>()

export interface Command {
  name: string
  description: string
  options?: ApplicationCommandOptionData[]
  permissions?: string
  execute: (cmd: CommandInteraction | Message, client: Client, channelWatcher: ChannelWatcher) => Promise<void>
}

export async function matchSlashCommand (action: CommandInteraction, client: Client, watcher: ChannelWatcher): Promise<void> {
  const command = commandMap.get(action.commandName)?.execute
  if (command !== undefined) {
    await command(action, client, watcher)
  }
}

export async function setCommands (client: Client): Promise<void> {
  if (commandMap.size === 0) {
    commandMap.set('help', helpCommand)
    commandMap.set('watch', watchChannelCommand)
    commandMap.set('invite', inviteCommand)
  }
  const promises: Array<Promise<ApplicationCommand> | undefined> = []
  if (client.application?.commands.cache.size === 0) {
    commandMap.forEach((c, n) => {
      promises.push(
        client.application?.commands.create({
          name: c.name,
          description: c.description,
          options: c.options,
          default_member_permissions: c.permissions
        })
      )
    })
    await Promise.all(promises)
  }
}

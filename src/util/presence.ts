import { Client } from 'discord.js'

export function updatePresence (client: Client, prefix: string): void {
  client.user?.setPresence({
    activities: [{
      type: 'WATCHING',
      name: `${client.guilds.cache.size} guilds | ${prefix}help`
    }]
  })
}

import { readFileSync, writeFileSync } from 'fs'

const fileLocation: string = '/app/data/channels.txt'

export class ChannelWatcher {
  channels: string[]

  constructor () {
    this.channels = readFileSync(fileLocation).toString().split('\n')
  }

  isWatching (id: string): boolean {
    return this.channels.includes(id)
  }

  removeChannel (id: string): void {
    this.isWatching(id) && this.channels.splice(this.channels.indexOf(id), 1)
    writeFileSync(fileLocation, this.channels.join('\n'))
  }

  addChannel (id: string): void {
    this.channels.push(id)
    writeFileSync(fileLocation, this.channels.join('\n'))
  }
}

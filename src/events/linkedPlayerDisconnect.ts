import { Interpreter } from '@tryforge/forgescript'
import { Guild } from 'discord.js'

import { ForgeLinked } from '..'
import { ForgeLinkedEventHandler } from '../structures/ForgeLinkedEventManager'

export default new ForgeLinkedEventHandler({
  name: 'linkedPlayerDisconnect',
  version: '1.0.0',
  description: 'This event is called when a player disconnects',
  listener(player, voiceChannelID) {
    const commands = this.getExtension(ForgeLinked, true).commands.get('linkedPlayerDisconnect')

    const guild = this.guilds.cache.get(player.guildId) as Guild

    for (const command of commands) {
      Interpreter.run({
        obj: { guild },
        client: this,
        command,
        data: command.compiled.code,
        extras: { player, voiceID: voiceChannelID },
      })
    }
  },
})

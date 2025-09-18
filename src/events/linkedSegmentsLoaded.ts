import { Interpreter } from '@tryforge/forgescript'
import { Guild } from 'discord.js'

import { ForgeLinked } from '..'
import { ForgeLinkedEventHandler } from '../structures/ForgeLinkedEventManager'

export default new ForgeLinkedEventHandler({
  name: 'linkedSegmentsLoaded',
  description: 'Triggered when segments are loaded for a track',
  listener(player, track, payload) {
    const commands = this.getExtension(ForgeLinked, true).commands.get('linkedSegmentsLoaded')
    const guild = this.guilds.cache.get(player.guildId) as Guild

    for (const command of commands) {
      Interpreter.run({
        obj: guild,
        client: this,
        command,
        data: command.compiled.code,
        extras: { player, track, payload },
      })
    }
  },
})

import { Interpreter } from '@tryforge/forgescript'
import { Guild } from 'discord.js'

import { ForgeLinked } from '..'
import { ForgeLinkedEventHandler } from '../structures/ForgeLinkedEventManager'

export default new ForgeLinkedEventHandler({
  name: 'linkedPlayerSuppressChange',
  description: 'This event is called when a player suppress state changes',
  listener(player, suppress) {
    const commands = this.getExtension(ForgeLinked, true).commands.get('linkedPlayerSuppressChange')

    const guild = this.guilds.cache.get(player.guildId) as Guild

    for (const command of commands) {
      Interpreter.run({
        obj: guild,
        client: this,
        command,
        data: command.compiled.code,
        extras: { player, suppress },
      })
    }
  },
})

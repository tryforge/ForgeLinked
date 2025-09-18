import { Interpreter } from '@tryforge/forgescript'
import { Guild } from 'discord.js'

import { ForgeLinked } from '..'
import { ForgeLinkedEventHandler } from '../structures/ForgeLinkedEventManager'

export default new ForgeLinkedEventHandler({
  name: 'linkedPlayerQueueEmptyCancel',
  version: '2.0.0',
  description:
    'This event is called when the queue empty handler is cancelled (e.g., a new track was added)',
  listener(player) {
    const commands = this.getExtension(ForgeLinked, true).commands.get(
      'linkedPlayerQueueEmptyCancel',
    )
    const guild = this.guilds.cache.get(player.guildId) as Guild

    for (const command of commands) {
      Interpreter.run({
        obj: guild,
        client: this,
        command,
        data: command.compiled.code,
        extras: { player },
      })
    }
  },
})

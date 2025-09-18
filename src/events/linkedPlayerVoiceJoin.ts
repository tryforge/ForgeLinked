import { Interpreter } from '@tryforge/forgescript'
import { Guild } from 'discord.js'

import { ForgeLinked } from '..'
import { ForgeLinkedEventHandler } from '../structures/ForgeLinkedEventManager'

export default new ForgeLinkedEventHandler({
  name: 'linkedPlayerVoiceJoin',
  description:
    'This event is called when a user joins the player voice channel while there is a player',
  listener(player, userId) {
    const commands = this.getExtension(ForgeLinked, true).commands.get('linkedPlayerVoiceJoin')
    const guild = this.guilds.cache.get(player.guildId) as Guild

    for (const command of commands) {
      Interpreter.run({
        obj: guild,
        client: this,
        command,
        data: command.compiled.code,
        extras: { player, userId },
      })
    }
  },
})

import { Interpreter } from '@tryforge/forgescript';
import { ForgeLinked } from '..';
import { ForgeLinkedEventHandler } from '../structures/ForgeLinkedEventManager';
import { Guild } from 'discord.js';

export default new ForgeLinkedEventHandler({
  name: 'linkedPlayerVoiceLeave',
  description: 'This event is called when a user leaves (or switches away from) the player voice channel while there is a player',
  listener(player, userId) {
    const commands = this.getExtension(ForgeLinked, true).commands.get('linkedPlayerVoiceLeave');
    const guild = this.guilds.cache.get(player.guildId) as Guild;

    for (const command of commands) {
      Interpreter.run({
        obj: guild,
        client: this,
        command,
        data: command.compiled.code,
        extras: { player, userId },
      });
    }
  },
});

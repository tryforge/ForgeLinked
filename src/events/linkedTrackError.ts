import { Interpreter } from '@tryforge/forgescript';
import { ForgeLinked } from '..';
import { ForgeLinkedEventHandler } from '../structures/ForgeLinkedEventManager';
import { Guild } from 'discord.js';

export default new ForgeLinkedEventHandler({
  name: 'linkedTrackError',
  description: 'Triggered when an error occurs during track playback',
  listener(player, track, payload) {
    const commands = this.getExtension(ForgeLinked, true).commands.get('linkedTrackError');
    const guild = this.guilds.cache.get(player.guildId) as Guild;

    for (const command of commands) {
      Interpreter.run({
        obj: guild,
        client: this,
        command,
        data: command.compiled.code,
        extras: { player, track, payload },
      });
    }
  },
});

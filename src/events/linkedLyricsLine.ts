import { Interpreter } from '@tryforge/forgescript';
import { ForgeLinked } from '..';
import { ForgeLinkedEventHandler } from '../structures/ForgeLinkedEventManager';
import { Guild } from 'discord.js';

export default new ForgeLinkedEventHandler({
  name: 'linkedLyricsLine',
  description: 'Triggered when a new lyrics line is received',
  listener(player, track, payload) {
    const commands = this.getExtension(ForgeLinked, true).commands.get('linkedLyricsLine');
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

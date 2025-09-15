import { Interpreter } from '@tryforge/forgescript';
import { ForgeLinked } from '..';
import { ForgeLinkedEventHandler } from '../structures/ForgeLinkedEventManager';

export default new ForgeLinkedEventHandler({
  name: 'linkedPlayerDisconnect',
  description: 'This event is called when a player disconnects',
  listener(player, voiceChannelID) {
    const commands = this.getExtension(ForgeLinked, true).commands.get('linkedPlayerDisconnect');

    for (const command of commands) {
      Interpreter.run({
        obj: {},
        client: this,
        command,
        data: command.compiled.code,
        extras: {player, voiceID: voiceChannelID},
      });
    }
  },
});
import { Interpreter } from '@tryforge/forgescript';
import { ForgeLinked } from '..';
import { ForgeLinkedEventHandler } from '../structures/ForgeLinkedEventManager';

export default new ForgeLinkedEventHandler({
  name: 'linkedPlayerMove',
  description: 'This event is called when a player moves',
  listener(player, oldVoiceChannelID, newVoiceChannelID) {
    const commands = this.getExtension(ForgeLinked, true).commands.get('linkedPlayerMove');

    for (const command of commands) {
      Interpreter.run({
        obj: {},
        client: this,
        command,
        data: command.compiled.code,
        extras: {player, old: oldVoiceChannelID, new: newVoiceChannelID},
      });
    }
  },
});
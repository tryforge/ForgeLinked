import { Interpreter } from '@tryforge/forgescript';
import { ForgeLinked } from '..';
import { ForgeLinkedEventHandler } from '../structures/ForgeLinkedEventManager';

export default new ForgeLinkedEventHandler({
  name: 'linkedPlayerDestroy',
  description: 'This event is called when a player is destroyed',
  listener(player, reason) {
    const commands = this.getExtension(ForgeLinked, true).commands.get('linkedPlayerDestroy');

    for (const command of commands) {
      Interpreter.run({
        obj: {},
        client: this,
        command,
        data: command.compiled.code,
        extras: {player, reason: reason},
      });
    }
  },
})
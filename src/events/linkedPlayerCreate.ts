import { Interpreter } from '@tryforge/forgescript';
import { ForgeLinked } from '..';
import { ForgeLinkedEventHandler } from '../structures/ForgeLinkedEventManager';

export default new ForgeLinkedEventHandler({
  name: 'linkedPlayerCreate',
  description: 'This event is called when a player is created',
  listener(player) {
    const commands = this.getExtension(ForgeLinked, true).commands.get('linkedPlayerCreate');

    for (const command of commands) {
      Interpreter.run({
        obj: {},
        client: this,
        command,
        data: command.compiled.code,
        extras: player,
      });
    }
  },
});

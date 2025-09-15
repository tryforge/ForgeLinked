import { Interpreter } from '@tryforge/forgescript';
import { ForgeLinked } from '..';
import { ForgeLinkedEventHandler } from '../structures/ForgeLinkedEventManager';

export default new ForgeLinkedEventHandler({
  name: 'error',
  version: '1.0.0',
  description: 'This event is called when an error occurs',
  listener(err) {
    const commands = this.getExtension(ForgeLinked, true).commands.get('error');

    for (const command of commands) {
      Interpreter.run({
        obj: {},
        client: this,
        command,
        data: command.compiled.code,
        extras: err,
      });
    }
  },
});
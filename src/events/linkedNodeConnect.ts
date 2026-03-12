import { Interpreter } from '@tryforge/forgescript'

import { ForgeLinked } from '..'
import { ForgeLinkedEventHandler } from '../structures/ForgeLinkedEventManager'

export default new ForgeLinkedEventHandler({
  name: 'linkedNodeConnect',
  version: '2.1.3',
  description: 'Triggered when connects to a node',
  listener(node) {
    const commands = this.getExtension(ForgeLinked, true).commands.get('linkedNodeConnect')

    for (const command of commands) {
      Interpreter.run({
        obj: {},
        client: this,
        command,
        data: command.compiled.code,
        extras: { node },
      })
    }
  },
})

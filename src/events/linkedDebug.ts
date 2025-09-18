import { Interpreter } from '@tryforge/forgescript'

import { ForgeLinked } from '..'
import { ForgeLinkedEventHandler } from '../structures/ForgeLinkedEventManager'

export default new ForgeLinkedEventHandler({
  name: 'linkedDebug',
  description: 'Triggered for various debug logs and errors',
  listener(eventKey, eventData) {
    const commands = this.getExtension(ForgeLinked, true).commands.get('linkedDebug')

    for (const command of commands) {
      Interpreter.run({
        obj: this,
        client: this,
        command,
        data: command.compiled.code,
        extras: { eventKey, eventData },
      })
    }
  },
})

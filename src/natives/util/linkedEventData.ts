import { ArgType, NativeFunction } from '@tryforge/forgescript'

export default new NativeFunction({
  name: '$linkedEvent',
  description: 'This function is used to get player info on events for forgelinked',
  version: '1.0.0',
  unwrap: false,
  output: ArgType.Json,
  execute(ctx) {
    return this.successJSON(ctx.runtime.extras)
  },
})

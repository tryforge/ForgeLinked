import { ArgType, NativeFunction } from '@tryforge/forgescript'

export default new NativeFunction({
  name: '$linkedEventPlayerCreate',
  description: 'This function is used to get player info on the event linkedPlayerCreate',
  unwrap: false,
  output: ArgType.Json,
  execute(ctx) {
    return this.successJSON(ctx.runtime.extras)
  },
})
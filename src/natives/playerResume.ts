import { ArgType, NativeFunction } from '@tryforge/forgescript'
import { ForgeLinked } from '../index.js'

export default new NativeFunction({
  name: '$playerResume',
  description: 'Resume a player',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'guildId',
      description: 'The guild id to resume the player for',
      type: ArgType.Guild,
      required: true,
      rest: false,
    },
  ],
  output: ArgType.Boolean,
  execute(ctx, [guildId]) {
    const linked = ctx.client.getExtension(ForgeLinked, true).lavalink
    if (!linked) return this.customError('ForgeLinked is not initialized')
    const player = linked.getPlayer(guildId.id)
    if (!player) return this.customError('Player not found')
    player.resume()
    return this.success(true)
  },
})
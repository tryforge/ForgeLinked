import { ArgType, NativeFunction } from '@tryforge/forgescript'

import { ForgeLinked } from '../index.js'

export default new NativeFunction({
  name: '$playerDestroy',
  description: 'Destroy a player',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'guildId',
      description: 'The guild id to destroy the player for',
      type: ArgType.Guild,
      required: true,
      rest: false,
    },
    {
      name: 'reason',
      description: 'The reason to destroy the player for',
      type: ArgType.String,
      required: false,
      rest: false,
    },
  ],
  output: ArgType.Boolean,
  execute(ctx, [guildId, reason]) {
    const linked = ctx.client.getExtension(ForgeLinked, true).lavalink
    if (!linked) return this.customError('ForgeLinked is not initialized')
    const player = linked.getPlayer(guildId.id)
    if (!player) return this.customError('Player not found')
    player.destroy(reason || undefined)
    return this.success(true)
  },
})

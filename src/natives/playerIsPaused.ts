import { ArgType, NativeFunction } from '@tryforge/forgescript'

import { ForgeLinked } from '..'

export default new NativeFunction({
  name: '$playerIsPaused',
  description: 'Check if a player is paused',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'guildId',
      description: 'The guild id to check the player for',
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
    return this.success(player.paused)
  },
})

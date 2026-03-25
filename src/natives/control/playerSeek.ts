import { ArgType, NativeFunction } from '@tryforge/forgescript'

import { ForgeLinked } from '../../index.js'

export default new NativeFunction({
  name: '$playerSeek',
  description: 'Seek a player',
  version: '2.1.0',
  brackets: false,
  unwrap: true,
  args: [
    {
      name: 'guildId',
      description: 'The guild id to seek the player for',
      type: ArgType.Guild,
      required: true,
      rest: false,
    },
    {
      name: 'position',
      description: 'The position to seek the player to',
      type: ArgType.Number,
      required: true,
      rest: false,
    },
  ],
  output: ArgType.Boolean,
  async execute(ctx, [guildId, position]) {
    try {
      const linked = ctx.client.getExtension(ForgeLinked, true)?.lavalink
      if (!linked) return this.customError('ForgeLinked is not initialized')
      const player = linked.getPlayer(guildId.id)
      if (!player) return this.customError('Player not found')
      if (!player.node?.connected)
        return this.customError(
          'Lavalink node is not connected. Please wait for the node to reconnect.',
        )
      if (position < 0) return this.customError('Position must be 0 or greater')
      await player.seek(position)
      return this.success(true)
    } catch (err) {
      return this.customError(
        `Failed to seek player: ${err instanceof Error ? err.message : String(err)}`,
      )
    }
  },
})

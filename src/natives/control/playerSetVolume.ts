import { ArgType, NativeFunction } from '@tryforge/forgescript'

import { ForgeLinked } from '../../index.js'

export default new NativeFunction({
  name: '$playerSetVolume',
  description: 'Set the volume of a player',
  version: '1.0.0',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'guildId',
      description: 'The guild id to set the volume for',
      type: ArgType.Guild,
      required: true,
      rest: false,
    },
    {
      name: 'volume',
      description: 'The volume to set for the player',
      type: ArgType.Number,
      required: true,
      rest: false,
    },
  ],
  output: ArgType.Boolean,
  async execute(ctx, [guildId, volume]) {
    try {
      const linked = ctx.client.getExtension(ForgeLinked, true)?.lavalink
      if (!linked) return this.customError('ForgeLinked is not initialized')
      const player = linked.getPlayer(guildId.id)
      if (!player) return this.customError('Player not found')
      if (!player.node?.connected)
        return this.customError(
          'Lavalink node is not connected. Please wait for the node to reconnect.',
        )
      if (volume < 0 || volume > 1000) return this.customError('Volume must be between 0 and 1000')
      await player.setVolume(volume)
      return this.success(true)
    } catch (err) {
      return this.customError(
        `Failed to set volume: ${err instanceof Error ? err.message : String(err)}`,
      )
    }
  },
})

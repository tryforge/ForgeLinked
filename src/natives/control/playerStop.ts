import { ArgType, NativeFunction } from '@tryforge/forgescript'

import { ForgeLinked } from '../../index.js'

export default new NativeFunction({
  name: '$playerStop',
  description: 'Stops playback without destroying the player',
  version: '2.1.0',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'guildId',
      description: 'The guild id to stop the player for',
      type: ArgType.Guild,
      required: true,
      rest: false,
    },
    {
      name: 'clearQueue',
      description: 'Whether to clear the queue',
      type: ArgType.Boolean,
      required: true,
      rest: false,
    },
  ],
  output: ArgType.Boolean,
  execute(ctx, [guildId, clearQueue]) {
    const linked = ctx.client.getExtension(ForgeLinked, true).lavalink
    if (!linked) return this.customError('ForgeLinked is not initialized')
    const player = linked.getPlayer(guildId.id)
    if (!player) return this.customError('Player not found')
    player.stopPlaying(clearQueue)
    return this.success(true)
  },
})

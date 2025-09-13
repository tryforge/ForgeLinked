import { ArgType, NativeFunction } from '@tryforge/forgescript'

import { ForgeLinked } from '../index.js'

export default new NativeFunction({
  name: '$playerRemoveTrack',
  description: 'Remove a track from a player',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'guildId',
      description: 'The guild id to remove the track from',
      type: ArgType.Guild,
      required: true,
      rest: false,
    },
    {
      name: 'index',
      description: 'The index of the track to remove',
      type: ArgType.Number,
      required: true,
      rest: false,
    },
  ],
  output: ArgType.Boolean,
  execute(ctx, [guildId, index]) {
    const linked = ctx.client.getExtension(ForgeLinked, true).lavalink
    if (!linked) return this.customError('ForgeLinked is not initialized')
    const player = linked.getPlayer(guildId.id)
    if (!player) return this.customError('Player not found')
    player.queue.remove(index)
    return this.success(true)
  },
})

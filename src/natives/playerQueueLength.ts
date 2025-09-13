import { ArgType, NativeFunction } from '@tryforge/forgescript'

import { ForgeLinked } from '..'

export default new NativeFunction({
  name: '$playerQueueLength',
  description: 'Get the queue length of a player',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'guildId',
      description: 'The guild id to get the queue length for',
      type: ArgType.Guild,
      required: true,
      rest: false,
    },
  ],
  output: ArgType.Number,
  execute(ctx, [guildId]) {
    const linked = ctx.client.getExtension(ForgeLinked, true).lavalink
    if (!linked) return this.customError('ForgeLinked is not initialized')
    const player = linked.getPlayer(guildId.id)
    if (!player) return this.customError('Player not found')
    return this.success(player.queue.tracks.length.toFixed())
  },
})

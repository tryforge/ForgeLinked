import { ArgType, NativeFunction } from '@tryforge/forgescript'

import { ForgeLinked } from '..'

export default new NativeFunction({
  name: '$playerQueue',
  description: 'Get the queue of a player',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'guildId',
      description: 'The guild id to get the queue for',
      type: ArgType.Guild,
      required: true,
      rest: false,
    },
  ],
  output: ArgType.Json,
  execute(ctx, [guildId]) {
    const linked = ctx.client.getExtension(ForgeLinked, true).lavalink
    if (!linked) return this.customError('ForgeLinked is not initialized')
    const player = linked.getPlayer(guildId.id)
    if (!player) return this.customError('Player not found')
    return this.successJSON(player.queue.tracks)
  },
})

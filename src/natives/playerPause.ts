import { ArgType, NativeFunction } from '@tryforge/forgescript'
import { ForgeLinked } from '../index.js'

export default new NativeFunction({
  name: '$playerPause',
  description: 'Pause a player',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'guildId',
      description: 'The guild id to pause the player for',
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
    player.pause()
    return this.success(true)
  },
})
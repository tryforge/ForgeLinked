import { ArgType, NativeFunction } from '@tryforge/forgescript'
import { ForgeLinked } from '../../index.js'

export default new NativeFunction({
  name: '$playerLoopStatus',
  description: 'Get the current loop mode',
  version: '2.1.0',
  brackets: false,
  unwrap: true,
  args: [
    {
      name: 'guildId',
      description: 'The guild id to get the loop mode for',
      type: ArgType.Guild,
      required: true,
      rest: false,
    },
  ],
  output: ArgType.String,
  async execute(ctx, [guildId]) {
    const linked = ctx.client.getExtension(ForgeLinked, true).lavalink
    if (!linked) return this.customError('ForgeLinked is not initialized')
    const player = linked.getPlayer(guildId.id)
    if (!player) return this.customError('Player not found')
    return this.success(player.repeatMode)
  },
})

import { ArgType, NativeFunction } from '@tryforge/forgescript'

import { ForgeLinked } from '../../index.js'

export default new NativeFunction({
  name: '$playerSetAutoPlay',
  description:
    'Enable or disable autoplay for a player. When enabled, a related track is automatically queued when the queue runs empty.',
  version: '2.3.0',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'guildId',
      description: 'The guild id to set autoplay for',
      type: ArgType.Guild,
      required: true,
      rest: false,
    },
    {
      name: 'enabled',
      description: 'Whether to enable autoplay',
      type: ArgType.Boolean,
      required: true,
      rest: false,
    },
  ],
  output: ArgType.Boolean,
  async execute(ctx, [guildId, enabled]) {
    try {
      const linked = ctx.client.getExtension(ForgeLinked, true)?.lavalink
      if (!linked) return this.customError('ForgeLinked is not initialized')

      const player = linked.getPlayer(guildId.id)
      if (!player) return this.customError('Player not found')
      ;(player as any).autoPlay = enabled

      return this.success(enabled)
    } catch (err) {
      return this.customError(
        `Failed to set autoplay: ${err instanceof Error ? err.message : String(err)}`,
      )
    }
  },
})

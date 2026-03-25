import { ArgType, NativeFunction } from '@tryforge/forgescript'

import { ForgeLinked } from '../../index.js'

export default new NativeFunction({
  name: '$playerDestroy',
  description: 'Destroy a player',
  version: '1.0.0',
  brackets: false,
  unwrap: true,
  args: [
    {
      name: 'guildId',
      description: 'The guild id to destroy the player for',
      type: ArgType.Guild,
      required: false,
      rest: false,
    },
    {
      name: 'reason',
      description: 'The reason to destroy the player for',
      type: ArgType.String,
      required: false,
      rest: false,
    },
  ],
  output: ArgType.Boolean,
  async execute(ctx, [guildId, reason]) {
    try {
      const linked = ctx.client.getExtension(ForgeLinked, true)?.lavalink
      if (!linked) return this.customError('ForgeLinked is not initialized')
      if (!guildId) guildId = ctx.guild
      if (!guildId)
        return this.customError(
          'Unable to find any guild. Ensure this command was ran inside of a guild and not DMs or a group chat',
        )
      const player = linked.getPlayer(guildId.id)
      if (!player) return this.customError('Player not found')
      await player.destroy(reason || undefined)
      return this.success(true)
    } catch (err) {
      return this.customError(
        `Failed to destroy player: ${err instanceof Error ? err.message : String(err)}`,
      )
    }
  },
})

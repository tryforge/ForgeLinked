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
      name: 'clearQueue',
      description: 'Whether to clear the queue',
      type: ArgType.Boolean,
      required: true,
      rest: false,
    },
    {
      name: 'guildId',
      description: 'The guild id to stop the player for',
      type: ArgType.Guild,
      required: false,
      rest: false,
    },
  ],
  output: ArgType.Boolean,
  execute(ctx, [clearQueue, guildId]) {
    const linked = ctx.client.getExtension(ForgeLinked, true).lavalink
    if (!linked) return this.customError('ForgeLinked is not initialized')
    if (!guildId) guildId = ctx.guild
    if (!guildId)
      return this.customError(
        'Unable to find any guild. Ensure this command was ran inside of a guild and not dms or a group chat',
      )
    const player = linked.getPlayer(guildId.id)
    if (!player) return this.customError('Player not found')
    player.stopPlaying(clearQueue)
    return this.success(true)
  },
})

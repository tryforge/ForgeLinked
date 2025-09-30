import { ArgType, NativeFunction } from '@tryforge/forgescript'
import { ForgeLinked } from '../../index.js'
import { Guild } from 'discord.js'

export default new NativeFunction({
  name: '$playerSkip',
  description: 'Skip a track. If position not given skips current track.',
  version: '2.1.0',
  brackets: false,
  unwrap: true,
  args: [
    {
      name: 'guildId',
      description: 'The guild id to skip the track for',
      type: ArgType.Guild,
      required: true,
      rest: false,
    },
    {
      name: 'position',
      description: 'The position to skip to',
      type: ArgType.Number,
      required: false,
      rest: false,
    },
  ],
  output: ArgType.Boolean,
  execute(ctx, [guildId, position]) {
    const linked = ctx.client.getExtension(ForgeLinked, true).lavalink
    if (!linked) return this.customError('ForgeLinked is not initialized')
    if (!guildId) guildId = ctx.guild as Guild
    if (!guildId)
      return this.customError(
        'Unable to find any guild. Ensure this command was ran inside of a guild and not dms or a group chat',
      )
    const player = linked.getPlayer(guildId.id)
    if (!player) return this.customError('Player not found')
    if ((position || 0) > player.queue.tracks.length) return this.customError('Cannot skip more than the queue size.')
    player.skip(position || undefined)
    return this.success(true)
  },
})
import { ArgType, NativeFunction } from '@tryforge/forgescript'
import { Guild } from 'discord.js'

import { ForgeLinked } from '../../index.js'

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
      required: false,
      rest: false,
    },
    {
      name: 'position',
      description: 'The position to skip to',
      type: ArgType.Number,
      required: false,
      rest: false,
    },
    {
      name: 'throwError',
      description: 'Whether to throw an error if the position is out of bounds',
      type: ArgType.Boolean,
      required: false,
      rest: false,
    },
  ],
  output: ArgType.Boolean,
  async execute(ctx, [guildId, position, throwError]) {
    try {
      const linked = ctx.client.getExtension(ForgeLinked, true)?.lavalink
      if (!linked) return this.customError('ForgeLinked is not initialized')
      if (!guildId) guildId = ctx.guild as Guild
      if (!guildId)
        return this.customError(
          'Unable to find any guild. Ensure this command was ran inside of a guild and not DMs or a group chat',
        )
      const player = linked.getPlayer(guildId.id)
      if (!player) return this.customError('Player not found')
      if (!player.node?.connected)
        return this.customError(
          'Lavalink node is not connected. Please wait for the node to reconnect.',
        )
      if ((position || 0) > player.queue.tracks.length)
        return this.customError('Cannot skip more than the queue size.')
      await player.skip(position || undefined, throwError || false)
      return this.success(true)
    } catch (err) {
      return this.customError(
        `Failed to skip track: ${err instanceof Error ? err.message : String(err)}`,
      )
    }
  },
})

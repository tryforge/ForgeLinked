import { ArgType, NativeFunction } from '@tryforge/forgescript'

import { ForgeLinked } from '../../index.js'

export default new NativeFunction({
  name: '$playerQueueTime',
  description: 'Get the total queue time of a player, optionally excluding specific sources.',
  version: '1.1.0',
  brackets: false,
  unwrap: true,
  args: [
    {
      name: 'guildId',
      description: 'The guild ID to get the queue time for.',
      type: ArgType.Guild,
      required: false,
      rest: false,
    },
    {
      name: 'exclude',
      description: 'Sources to exclude from the queue time (e.g. "youtube", "soundcloud").',
      type: ArgType.String,
      required: false,
      rest: true,
    },
  ],
  output: ArgType.Number,

  execute(ctx, [guildId, exclude]) {
    const linked = ctx.client.getExtension(ForgeLinked, true).lavalink
    if (!linked) return this.customError('ForgeLinked is not initialized')

    if (!guildId) guildId = ctx.guild
    if (!guildId)
      return this.customError(
        'Unable to find any guild. Ensure this command was ran inside of a guild and not DMs or a group chat.',
      )

    const player = linked.getPlayer(guildId.id)
    if (!player) return this.customError('Player not found')

    // Gather all tracks: previous + queue + current
    const allTracks = [
      ...(player.queue.previous ?? []),
      ...(player.queue.tracks ?? []),
      ...(player.queue.current ? [player.queue.current] : []),
    ]

    // Normalize exclusions (convert to lowercase, split by commas or semicolons)
    const excludeList = (exclude ?? [])
      .flatMap((e) => e.split(/[;,]+/))
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean)

    // Calculate total duration excluding the given sources
    const total = allTracks
      .filter((track) => {
        const source = track.info.sourceName?.toLowerCase() || ''
        return !excludeList.includes(source)
      })
      .reduce((acc, track) => acc + (track.info.duration || 0), 0)

    return this.success(total)
  },
})

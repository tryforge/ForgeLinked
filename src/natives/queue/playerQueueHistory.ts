import { ArgType, NativeFunction } from '@tryforge/forgescript'

import { ForgeLinked } from '../..'

export default new NativeFunction({
  name: '$playerQueueHistory',
  description: 'Get the queue history of a player',
  version: '1.0.0',
  brackets: false,
  unwrap: true,
  args: [
    {
      name: 'guildId',
      description: 'The guild id to get the queue history for',
      type: ArgType.Guild,
      required: false,
      rest: false,
    },
  ],
  output: ArgType.Json,
  execute(ctx, [guildId]) {
    const linked = ctx.client.getExtension(ForgeLinked, true).lavalink
    if (!linked) return this.customError('ForgeLinked is not initialized')
    if (!guildId) guildId = ctx.guild
    if (!guildId)
      return this.customError(
        'Unable to find any guild. Ensure this command was ran inside of a guild and not dms or a group chat',
      )
    const player = linked.getPlayer(guildId.id)
    if (!player) return this.customError('Player not found')

    const historyTracks = []
    const previousTracks = player.queue.previous || []
    if (previousTracks.length) {
      for (const track of previousTracks) {
        historyTracks.push({
          trackSource: track.info.sourceName,
          trackTitle: track.info.title,
          trackAuthor: track.info.author,
          trackUri: track.info.uri,
          length: track.info.duration,
          requester: track.requester,
        })
      }
    }

    return this.successJSON({
      guildId: guildId.id,
      history: historyTracks,
    })
  },
})

import { ArgType, NativeFunction } from '@tryforge/forgescript'

import { ForgeLinked } from '../../index.js'

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
        'Unable to find any guild. Ensure this command was ran inside of a guild and not DMs or a group chat',
      )
    const player = linked.getPlayer(guildId.id)
    if (!player) return this.customError('Player not found')

    const currentId = player.queue.current?.info.identifier
    const history = (player.queue.previous ?? [])
      // Exclude the currently-playing track that lavalink-client pushes into previous[0]
      .filter((t) => t.info.identifier !== currentId)
      .map((t) => ({
        trackSource: t.info.sourceName,
        trackTitle: t.info.title,
        trackAuthor: t.info.author,
        trackUri: t.info.uri,
        length: t.info.duration,
        requester: t.requester,
      }))

    return this.successJSON({ guildId: guildId.id, history })
  },
})

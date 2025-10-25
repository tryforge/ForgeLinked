import { ArgType, NativeFunction } from '@tryforge/forgescript'

import { ForgeLinked } from '../../index.js'

export default new NativeFunction({
  name: '$playerSearchTrack',
  description: 'Search for a track',
  version: '1.0.0',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'guildId',
      description: 'The guild id to search for the track in',
      type: ArgType.Guild,
      required: true,
      rest: false,
    },
    {
      name: 'query',
      description: 'The query to search for',
      type: ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'source',
      description:
        'The source to use. Such as yt for youtube ytm for youtube music etc. Depends on the lavalink server config',
      type: ArgType.String,
      required: false,
      rest: false,
    },
    {
      name: 'requester',
      description: 'The requester of the track',
      type: ArgType.Member,
      required: false,
      rest: false,
    },
    {
      name: 'limit',
      description: 'The limit of the tracks to return',
      type: ArgType.Number,
      required: false,
      rest: false,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [guildId, query, source, requester, limit]) {
    const linked = ctx.client.getExtension(ForgeLinked, true).lavalink
    if (!linked) return this.customError('ForgeLinked is not initialized')
    const player = linked.getPlayer(guildId.id)
    if (!player) return this.customError('Player not found')
    const result = await player.search(`${source}:${query}`, {
      requester: requester?.id || ctx.member?.id,
    })

    if (!result.tracks.length) return this.customError('No results found!')

    let tracks = result.tracks
    if (limit) tracks = tracks.slice(0, limit)

    return this.successJSON({
      status: 'success',
      type: result.loadType,
      message:
        result.loadType === 'playlist'
          ? `Found ${tracks.length} tracks from ${result.playlist?.name}`
          : `Found ${tracks.length} tracks matching the query.`,
      playlistName: result.loadType === 'playlist' ? result.playlist?.name : null,
      requester: result.tracks[0].requester,
      trackCount: tracks.length,
      tracks: tracks.map((track) => ({
        title: track.info.title,
        author: track.info.author,
        duration: track.info.duration,
        url: track.info.uri,
        thumbnail: track.info.artworkUrl,
      })),
    })
  },
})

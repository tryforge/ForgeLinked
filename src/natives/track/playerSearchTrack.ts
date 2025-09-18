import { ArgType, NativeFunction } from '@tryforge/forgescript'

import { ForgeLinked } from '../../index.js'

export default new NativeFunction({
  name: '$playerSearchTrack',
  description: 'Search for a track',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'query',
      description: 'The query to search for',
      type: ArgType.String,
      required: true,
      rest: false,
    },
    {
      name: 'guildId',
      description: 'The guild id to search for the track in',
      type: ArgType.Guild,
      required: false,
      rest: false,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [query, guildId]) {
    const linked = ctx.client.getExtension(ForgeLinked, true).lavalink
    if (!linked) return this.customError('ForgeLinked is not initialized')
    if (!guildId) guildId = ctx.guild
    if (!guildId)
      return this.customError(
        'Unable to find any guild. Ensure this command was ran inside of a guild and not dms or a group chat',
      )
    const player = linked.getPlayer(guildId.id)
    if (!player) return this.customError('Player not found')
    const result = await player.search(query, {
      requester: ctx.member?.id,
    })

    if (!result.tracks.length) return this.customError('No results found!')

    let tracks = result.tracks

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

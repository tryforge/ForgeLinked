import { ArgType, NativeFunction } from '@tryforge/forgescript'
import { User } from 'discord.js'

import { ForgeLinked } from '../index.js'

export default new NativeFunction({
  name: '$playerAddTrack',
  description: 'Add a track to a player',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'guildId',
      description: 'The guild id to add the track to',
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
  ],
  output: ArgType.Json,
  async execute(ctx, [guildId, query]) {
    const lavalink = ctx.client.getExtension(ForgeLinked, true).lavalink

    let player = lavalink.getPlayer(guildId.id)
    if (!player) return this.customError('Player not found')

    if (!player.connected) await player.connect()

    const result = await player.search({ query, source: 'ytsearch' }, ctx.member)
    if (!result || !result.tracks.length) return this.customError('No results found!')

    if (result.loadType === 'playlist') {
      player.queue.add(result.tracks)
    } else {
      player.queue.add(result.tracks[0])
    }

    if (!player.playing) await player.play()

    const requester = result.tracks[0].requester as User

    return this.successJSON({
      status: 'success',
      type: result.loadType,
      message:
        result.loadType === 'playlist'
          ? `Queued ${result.tracks.length} from ${result.playlist?.title}`
          : `Queued ${result.tracks[0].info.title}`,
      playlistName: result.loadType === 'playlist' ? result.playlist?.title : null,
      trackCount: result.loadType === 'playlist' ? result.tracks.length : 1,
      trackTitle: result.loadType !== 'playlist' ? result.tracks[0].info.title : null,
      trackAuthor: result.loadType !== 'playlist' ? result.tracks[0].info.author : null,
      trackImage: result.tracks[0].info.artworkUrl,
      requester: requester?.id || 'Unknown',
    })
  },
})

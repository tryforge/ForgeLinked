import { NativeFunction, ArgType } from "@tryforge/forgescript";
import { ForgeLinked } from "../index.js";
import { User } from "discord.js";

export default new NativeFunction({
  name: '$playerAddTrack',
  description: 'Add a track to a player',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'guildId',
      description: 'The guild id to add the track to',
      rest: false,
      type: ArgType.Guild,
      required: true,
    },
    {
      name: 'query',
      description: 'The query to search for',
      type: ArgType.String,
      rest: false,
      required: true,
    }
  ],
  async execute(ctx, [guildId, query]) {
    const start = Date.now()
    const linked = ctx.client.getExtension(ForgeLinked, true).kazagumo
    const player = linked.players.get(guildId.id)
    if (!player) return this.customError('No player found for this guild')

    const track = await player.search(query, { requester: ctx.member })
    if (!track) return this.successJSON({})

    if (track.type === "PLAYLIST")
      player.queue.add(track.tracks);
    else player.queue.add(track.tracks[0]);

    if (!player.playing && !player.paused) player.play();
    const requester = track.tracks[0].requester as User

    return this.successJSON({
      ping: Date.now() - start,
      status: "success",
      type: track.type,
      message: track.type === "PLAYLIST"
        ? `Queued ${track.tracks.length} from ${track.playlistName}`
        : `Queued ${track.tracks[0].title}`,
      playlistName: track.type === "PLAYLIST" ? track.playlistName : null,
      trackCount: track.type === "PLAYLIST" ? track.tracks.length : 1,
      trackTitle: track.type !== "PLAYLIST" ? track.tracks[0].title : null,
      trackAuthor: track.type !== "PLAYLIST" ? track.tracks[0].author : null,
      trackImage: track.tracks[0].thumbnail,
      requester: requester.id,
      queuePosition: player.queue.length,
      queueTotalTracks: player.queue.length,
      queueIsPlayingNow: !player.playing && !player.paused,
    });
  }
})

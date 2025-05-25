import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeLink } from '@structures/ForgeLink';

export default new NativeFunction({
    name: '$searchTrack',
    description: 'Searches for tracks in the guild and returns results.',
    version: "1.0.3",
    brackets: true,
    unwrap: true,
    args: [
        Arg.requiredGuild('Guild ID', 'The ID of the guild to create the player to.'),
        Arg.requiredString('Query', 'The search query.'),

        Arg.optionalNumber('Limit', 'The maximum number of results to return.')
    ],
    output: ArgType.Json,
    execute: async function(ctx, [guild = ctx.guild, query, limit]) {
        const lavalink = ctx.client.getExtension(ForgeLink, true).lavalink

        if (!lavalink) return this.customError("Lavalink is not initialized.");

        let player = lavalink.getPlayer(guild.id)

        const result = await player.search(query, {
            requester: ctx.member.id, 
        });

        if (!result.tracks.length) return this.customError("No results found!");

        let tracks = result.tracks;
        if (limit && limit > 0) tracks = tracks.slice(0, limit); 

        return this.successJSON({
            status: "success",
            type: result.loadType,
            message: result.loadType === "playlist"
                ? `Found ${tracks.length} tracks from ${result.playlist.name}`
                : `Found ${tracks.length} tracks matching the query.`,
            playlistName: result.loadType === "playlist" ? result.playlist.name : null,
            requester: result.tracks[0].requester,
            trackCount: tracks.length,
            tracks: tracks.map(track => ({
                title: track.title,
                author: track.author,
                duration: track.duration,
                url: track.uri,
                thumbnail: track.thumbnail
            }))
        });
    }
});
import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript'
import type { BaseChannel, VoiceBasedChannel } from 'discord.js'
import { ForgeLink } from '@structures/ForgeLink'
import { User } from 'discord.js';

export default new NativeFunction({
    name: '$addTrack',
    description: 'Adds a track into the guild player to listen to.',
    version: "1.0.0",
    brackets: true,
    unwrap: true,
    args: [
        Arg.requiredGuild('Guild ID', 'The ID of the guild to create the player to.'),
        Arg.requiredString('Query', 'Search query.')
    ],
    output: ArgType.String,
    execute: async function(ctx, [guild = ctx.guild, query]) {
        const kazagumo = ctx.client.getExtension(ForgeLink, true).kazagumo

        const player = kazagumo.getPlayer((guild.id ?? ctx.guild.id))
        if (!player) return this.customError("No player found!")

        const result = await kazagumo.search(query, {requester: ctx.member })

        if (!result.tracks.length) return this.customError("No results found!")

        if (result.type === "PLAYLIST")
            player.queue.add(result.tracks);
        else player.queue.add(result.tracks[0]);

        if (!player.playing && !player.paused) player.play();
        
        const requester = result.tracks[0].requester as User;

        return this.successJSON({

                status: "success",
        type: result.type,
        message: result.type === "PLAYLIST"
            ? `Queued ${result.tracks.length} from ${result.playlistName}`
            : `Queued ${result.tracks[0].title}`,
        playlistName: result.type === "PLAYLIST" ? result.playlistName : null,
        trackCount: result.type === "PLAYLIST" ? result.tracks.length : 1,
        trackTitle: result.type !== "PLAYLIST" ? result.tracks[0].title : null,
        trackAuthor: result.type !== "PLAYLIST" ? result.tracks[0].author : null,
        trackImage: result.tracks[0].thumbnail,
        requester: requester.id
    });
    }
})
import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeLink } from '@structures/ForgeLink';


export default new NativeFunction({
    name: '$queueHistory',
    description: 'Displays the history of previously played tracks from the guild player.',
    version: "1.1.0",
    brackets: false,
    experimental: true,
    unwrap: true,
    args: [
        Arg.requiredGuild('Guild ID', 'The ID of the guild'),
    ],
    output: ArgType.Json,
    execute: async function(ctx, [guild = ctx.guild]) {
        const lavalink = ctx.client.getExtension(ForgeLink, true).lavalink

        const player = lavalink.getPlayer((guild.id ?? ctx.guild.id)); 
if (!player) return this.customError("No player found!");

        const historyTracks = [];

        
        const previousTracks = player.queue.previous || [];
        if (previousTracks.length) {
            for (const track of previousTracks) {
                historyTracks.push({
                    trackSource: track.info.sourceName,
                    trackTitle: track.info.title,
                    trackAuthor: track.info.author,
                    trackUri: track.info.uri,
                    length: track.info.duration,
                    requester: track.requester
                });
            }
        }

        return this.successJSON({
            guildId: guild.id,
            history: historyTracks
        });
    }
});
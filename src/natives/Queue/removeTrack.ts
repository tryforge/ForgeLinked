import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript'
import type { BaseChannel, VoiceBasedChannel } from 'discord.js'
import { ForgeLink } from '@structures/ForgeLink'

export default new NativeFunction({
    name: '$removeTrack',
    description: 'Removes a track from the guild player',
    version: "1.0.0",
    brackets: true,
    unwrap: true,
    args: [
        Arg.requiredGuild('Guild ID', 'The ID of the guild'),
       {
            name: 'Position',
            description: 'track position',
            type: ArgType.Number,
            required: true,
            rest: false
        }
    ],
    output: ArgType.String,
    execute: async function(ctx, [guild = ctx.guild]) {
        const lavalink = ctx.client.getExtension(ForgeLink, true).lavalink

        const player = lavalink.getPlayer((guild.id ?? ctx.guild.id)); 
        if (!player) return this.customError("No player found!");


const index = player.position - 1;

if (isNaN(index) || index < 0 || index >= player.queue.tracks.length) {
    return this.customError(`Invalid position! Please Provide a number between 1 and ${player.queue.tracks.length}.`);
}

            player.queue.remove(index);
         
        return this.success();
    }
})
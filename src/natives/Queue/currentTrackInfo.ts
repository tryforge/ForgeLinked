import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript'
import type { BaseChannel, VoiceBasedChannel } from 'discord.js'
import { ForgeLink } from '@structures/ForgeLink'

export default new NativeFunction({
    name: '$currentTrackInfo',
    description: 'Gets info on the current track.',
    version: "1.0.0",
    brackets: false,
    unwrap: true,
    args: [
        Arg.requiredGuild('Guild ID', 'The ID of the guild'),
    ],
    output: ArgType.Json,
    execute: async function(ctx, [guild = ctx.guild]) {
        const lavalink = ctx.client.getExtension(ForgeLink, true).lavalink

        const player = lavalink.getPlayer((guild.id ?? ctx.guild.id)); 
if (!player) return this.customError("No player found!");
      
    

       return this.successJSON(player.queue.current.info);
    }
})
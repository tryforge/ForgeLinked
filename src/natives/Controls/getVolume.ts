import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript'
import type { BaseChannel, VoiceBasedChannel } from 'discord.js'
import { ForgeLink } from '@structures/ForgeLink'


export default new NativeFunction({
    name: '$getVolume',
    description: 'gets the guild player volume/loudness',
    version: "1.0.3",
    brackets: false,
    unwrap: true,
    args: [
        Arg.requiredGuild('Guild ID', 'The ID of the guild')
    ],
    output: ArgType.String,
    execute: async function(ctx, [guild = ctx.guild]) {
        const lavalink = ctx.client.getExtension(ForgeLink, true).lavalink

        const player = lavalink.getPlayer((guild.id ?? ctx.guild.id)); 
if (!player) return this.customError("No player found!");



return this.success(player.volume);
    }
})
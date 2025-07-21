import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript'
import { ForgeLink } from '@structures/ForgeLink'


export default new NativeFunction({
    name: '$seekTrack',
    description: 'Seeks a track',
    version: "1.0.1",
    brackets: true,
    unwrap: true,
    args: [
        Arg.requiredGuild('Guild ID', 'The ID of the guild'),
        {
            name: 'duration',
            description: 'Seek duration applied',
            type: ArgType.Number,
            required: true,
            rest: false
        }
    ],
    output: ArgType.String,
    execute: async function(ctx, [guild = ctx.guild, duration]) {
        const kazagumo = ctx.client.getExtension(ForgeLink, true).kazagumo

        const player = kazagumo.getPlayer((guild.id ?? ctx.guild.id)); 
if (!player) return this.customError("No player found!");

await player.seek(duration)

return this.success();
    }
})
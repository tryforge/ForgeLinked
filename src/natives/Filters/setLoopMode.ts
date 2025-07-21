import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript'
import { ForgeLink } from '@structures/ForgeLink'

const validModes = ['none', 'queue', 'track'] as const;
type LoopMode = typeof validModes[number];

export default new NativeFunction({
    name: '$setLoopMode',
    description: 'Set the loop mode of the music player.',
    version: "1.0.1",
    brackets: true,
    unwrap: true,
    args: [
        Arg.requiredGuild('Guild ID', 'The ID of the guild'),
        {
            name: 'mode',
            description: 'The loop mode of the music player.',
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    output: ArgType.String,
    execute: async function(ctx, [guild = ctx.guild, mode]) {
        const kazagumo = ctx.client.getExtension(ForgeLink, true).kazagumo

        const player = kazagumo.getPlayer((guild.id ?? ctx.guild.id)); 
if (!player) return this.customError("No player found!");

 if (!validModes.includes(mode as LoopMode)) {
            return this.customError(`Invalid loop mode: "${mode}". Must of type: ${validModes.join(', ')}`);
        }

await player.setLoop(mode as LoopMode)

return this.success();
    }
})
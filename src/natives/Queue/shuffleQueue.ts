import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript'
import { ForgeLink } from '@structures/ForgeLink'
import { setOriginalQueue, hasOriginalQueue } from '@utils/QueueMemory'

export default new NativeFunction({
    name: '$shuffleQueue',
    description: 'Shuffles the current Kazagumo queue.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [Arg.requiredGuild('Guild ID', 'The ID of the guild')],
    output: ArgType.String,
    async execute(ctx, [guild = ctx.guild]) {
        const music = ctx.client.getExtension(ForgeLink)
        const player = music.kazagumo.getPlayer(guild.id ?? ctx.guild.id)
        if (!player) return this.customError("No player found!")

        if (!player.queue.totalSize) return this.customError("Queue is empty.")

        if (!hasOriginalQueue(guild.id)) {
            const original = []
            for (let i = 0; i < player.queue.totalSize; i++) {
                const track = player.queue.at(i)
                if (track) original.push(track)
            }
            setOriginalQueue(guild.id, original)
        }

        player.queue.shuffle()

        return this.success("Queue shuffled.")
    }
})

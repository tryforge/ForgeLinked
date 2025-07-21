import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript'
import { ForgeLink } from '@structures/ForgeLink'
import { getOriginalQueue, clearOriginalQueue } from '@utils/QueueMemory'

export default new NativeFunction({
    name: '$unshuffleQueue',
    description: 'Restores the Kazagumo queue to its original order.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [Arg.requiredGuild('Guild ID', 'The ID of the guild')],
    output: ArgType.String,
    async execute(ctx, [guild = ctx.guild]) {
        const music = ctx.client.getExtension(ForgeLink)
        const player = music.kazagumo.getPlayer(guild.id ?? ctx.guild.id)
        if (!player) return this.customError("No player found!")

        const original = getOriginalQueue(guild.id)
        if (!original) return this.customError("No original queue saved.")

        player.queue.clear()
        for (const track of original) {
            player.queue.add(track)
        }

        clearOriginalQueue(guild.id)

        return this.success("Queue unshuffled and restored.")
    }
})

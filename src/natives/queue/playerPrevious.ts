import { ArgType, NativeFunction } from '@tryforge/forgescript'
import { Guild } from 'discord.js'

import { ForgeLinked } from '../../index.js'

export default new NativeFunction({
    name: '$playerPrevious',
    description: 'Plays the previous track from the queue history.',
    version: '2.1.0',
    brackets: false,
    unwrap: true,
    args: [
        {
            name: 'guildId',
            description: 'The guild id to play the previous track for',
            type: ArgType.Guild,
            required: true,
            rest: false,
        },
        {
            name: 'position',
            description: 'The number of tracks to go back (default 1)',
            type: ArgType.Number,
            required: false,
            rest: false,
        },
    ],
    output: ArgType.Boolean,
    execute(ctx, [guildId, position]) {
        const linked = ctx.client.getExtension(ForgeLinked, true).lavalink
        if (!linked) return this.customError('ForgeLinked is not initialized')
        if (!guildId) guildId = ctx.guild as Guild
        if (!guildId)
            return this.customError(
                'Unable to find any guild. Ensure this command was ran inside of a guild and not dms or a group chat',
            )
        const player = linked.getPlayer(guildId.id)
        if (!player) return this.customError('Player not found')

        const pos = position || 1
        if (pos < 1) return this.customError('Position must be greater than 0')

        if (player.queue.previous.length < pos)
            return this.customError('Not enough tracks in history to go back that far')

        // Take the last 'pos' tracks from previous (which are at the start of the array based on playerPreviousTrack logic)
        // playerPreviousTrack uses previous[0] as the last played.
        // So we splice from 0.
        const toRestore = player.queue.previous.splice(0, pos)

        // Reverse them so they are in playback order (Oldest -> Newest of the slice)
        // Example: History [A, B, C]. Go back 2.
        // Splice(0, 2) -> [A, B].
        // Reverse -> [B, A].
        // Unshift to queue -> [B, A, ...rest].
        // Skip -> Plays B. Queue has [A, ...rest].
        // This seems correct.
        toRestore.reverse()

        player.queue.tracks.unshift(...toRestore)
        player.skip()

        return this.success(true)
    },
})

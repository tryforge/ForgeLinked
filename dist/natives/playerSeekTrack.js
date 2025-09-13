import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeLinked } from '../index.js';
export default new NativeFunction({
    name: '$playerSeekTrack',
    description: 'Seek a track in a player',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'guildId',
            description: 'The guild id to seek the track for',
            rest: false,
            type: ArgType.Guild,
            required: true,
        },
        {
            name: 'position',
            description: 'The position to seek to',
            type: ArgType.Number,
            rest: false,
            required: true,
        },
    ],
    async execute(ctx, [guildId, position]) {
        const linked = ctx.client.getExtension(ForgeLinked, true).kazagumo;
        const player = linked.players.get(guildId.id);
        if (!player)
            return this.customError('No player found for this guild');
        player.seek(position);
        return this.success();
    },
});
//# sourceMappingURL=playerSeekTrack.js.map
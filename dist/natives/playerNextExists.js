import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeLinked } from '../index.js';
export default new NativeFunction({
    name: '$playerNextExists',
    description: 'Check if the next track exists in a player',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'guildId',
            description: 'The guild id to check the next track for',
            rest: false,
            type: ArgType.Guild,
            required: true,
        },
    ],
    async execute(ctx, [guildId]) {
        const linked = ctx.client.getExtension(ForgeLinked, true).kazagumo;
        const player = linked.players.get(guildId.id);
        if (!player)
            return this.customError('No player found for this guild');
        return this.success(player.queue.length > 1);
    },
});
//# sourceMappingURL=playerNextExists.js.map
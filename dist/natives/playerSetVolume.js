import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeLinked } from '../index.js';
export default new NativeFunction({
    name: '$playerSetVolume',
    description: 'Set the volume of a player',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'guildId',
            description: 'The guild id to set the volume of',
            rest: false,
            type: ArgType.Guild,
            required: true,
        },
        {
            name: 'volume',
            description: 'The volume to set',
            type: ArgType.Number,
            rest: false,
            required: true,
        },
    ],
    async execute(ctx, [guildId, volume]) {
        const linked = ctx.client.getExtension(ForgeLinked, true).kazagumo;
        const player = linked.players.get(guildId.id);
        if (!player)
            return this.customError('No player found for this guild');
        player.setVolume(volume);
        return this.success();
    },
});
//# sourceMappingURL=playerSetVolume.js.map
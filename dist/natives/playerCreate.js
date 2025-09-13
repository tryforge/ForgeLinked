import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeLinked } from '../index.js';
export default new NativeFunction({
    name: '$playerCreate',
    description: 'Create a player instance for a guild',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'guildId',
            description: 'The guild id to create the player for',
            rest: false,
            type: ArgType.Guild,
            required: true,
        },
        {
            name: 'voiceID',
            description: 'The ID of the voice channel for the bot to use',
            type: ArgType.Channel,
            rest: false,
            required: true,
        },
        {
            name: 'textID',
            description: 'The ID of the text channel for the bot to use',
            type: ArgType.Channel,
            rest: false,
            required: false,
        },
    ],
    async execute(ctx, [guildId, voiceId, textId]) {
        const linked = ctx.client.getExtension(ForgeLinked, true).kazagumo;
        await linked.createPlayer({
            guildId: guildId.id,
            voiceId: voiceId.id,
            textId: textId?.id ?? undefined,
        });
        return this.success(linked.players.has(guildId.id));
    },
});
//# sourceMappingURL=playerCreate.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../../");
exports.default = new forgescript_1.NativeFunction({
    name: '$playerToggleKaraoke',
    description: 'Enable / Disables a Karaoke like Filter Effect',
    version: '2.1.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'guildId',
            description: 'The guild id to toggle karaoke for',
            type: forgescript_1.ArgType.Guild,
            required: false,
            rest: false,
        },
        {
            name: 'level',
            description: 'The level for the karaoke effect',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false,
        },
        {
            name: 'monoLevel',
            description: 'The mono level for the karaoke effect',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false,
        },
        {
            name: 'filterBand',
            description: 'The filter band for the karaoke effect',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false,
        },
        {
            name: 'filterWidth',
            description: 'The filter width for the karaoke effect',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false,
        },
    ],
    output: forgescript_1.ArgType.Boolean,
    async execute(ctx, [guildId, level, monoLevel, filterBand, filterWidth]) {
        const linked = ctx.client.getExtension(__1.ForgeLinked, true).lavalink;
        if (!linked)
            return this.customError('ForgeLinked is not initialized');
        if (!guildId)
            guildId = ctx.guild;
        if (!guildId)
            return this.customError('Unable to find any guild. Ensure this command was ran inside of a guild and not dms or a group chat');
        const player = linked.getPlayer(guildId.id);
        if (!player)
            return this.customError('Player not found');
        const res = await player.filterManager.toggleKaraoke(level, monoLevel, filterBand, filterWidth);
        return this.success(res);
    },
});
//# sourceMappingURL=playerToggleKaraoke.js.map
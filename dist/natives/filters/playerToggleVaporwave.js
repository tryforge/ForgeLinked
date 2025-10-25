"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../../");
exports.default = new forgescript_1.NativeFunction({
    name: '$playerToggleVaporwave',
    description: 'Enables / Disables a Vaporwave-like filter Effect. Disables/Overrides both: custom and nightcore Filter',
    version: '2.1.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'guildId',
            description: 'The guild id to toggle vaporwave for',
            type: forgescript_1.ArgType.Guild,
            required: false,
            rest: false,
        },
        {
            name: 'speed',
            description: 'The speed for the vaporwave effect',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false,
        },
        {
            name: 'pitch',
            description: 'The pitch for the vaporwave effect',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false,
        },
        {
            name: 'rate',
            description: 'The rate for the vaporwave effect',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false,
        },
    ],
    output: forgescript_1.ArgType.Boolean,
    async execute(ctx, [guildId, speed, pitch, rate]) {
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
        const res = await player.filterManager.toggleVaporwave(speed, pitch, rate);
        return this.success(res);
    },
});
//# sourceMappingURL=playerToggleVaporwave.js.map
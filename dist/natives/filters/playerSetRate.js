"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../../");
exports.default = new forgescript_1.NativeFunction({
    name: '$playerSetRate',
    description: 'Set custom filter.timescale#rate . This method disabled both: nightcore & vaporwave. use 1 to reset it to normal',
    version: '2.1.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'guildId',
            description: 'The guild id to set the rate for',
            type: forgescript_1.ArgType.Guild,
            required: false,
            rest: false,
        },
        {
            name: 'rate',
            description: 'The rate to set',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false,
        },
    ],
    output: forgescript_1.ArgType.Boolean,
    async execute(ctx, [guildId, rate]) {
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
        const res = await player.filterManager.setRate(rate);
        return this.success(res);
    },
});
//# sourceMappingURL=playerSetRate.js.map
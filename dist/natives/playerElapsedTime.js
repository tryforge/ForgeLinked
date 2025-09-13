"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const index_js_1 = require("../index.js");
exports.default = new forgescript_1.NativeFunction({
    name: '$playerElapsedTime',
    description: 'Get the elapsed time of a player',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'guildId',
            description: 'The guild id to get the elapsed time for',
            type: forgescript_1.ArgType.Guild,
            required: true,
            rest: false,
        },
    ],
    output: forgescript_1.ArgType.Number,
    execute(ctx, [guildId]) {
        const linked = ctx.client.getExtension(index_js_1.ForgeLinked, true).lavalink;
        if (!linked)
            return this.customError('ForgeLinked is not initialized');
        const player = linked.getPlayer(guildId.id);
        if (!player)
            return this.customError('Player not found');
        return this.success(player.position);
    },
});
//# sourceMappingURL=playerElapsedTime.js.map
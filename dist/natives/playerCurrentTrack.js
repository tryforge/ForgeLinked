"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
exports.default = new forgescript_1.NativeFunction({
    name: '$playerCurrentTrack',
    description: 'Get the current track of a player',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'guildId',
            description: 'The guild id to get the current track for',
            type: forgescript_1.ArgType.Guild,
            required: true,
            rest: false,
        },
    ],
    output: forgescript_1.ArgType.Json,
    execute(ctx, [guildId]) {
        const linked = ctx.client.getExtension(__1.ForgeLinked, true).lavalink;
        if (!linked)
            return this.customError('ForgeLinked is not initialized');
        const player = linked.getPlayer(guildId.id);
        if (!player)
            return this.customError('Player not found');
        return this.successJSON(player.queue.current?.info);
    },
});
//# sourceMappingURL=playerCurrentTrack.js.map
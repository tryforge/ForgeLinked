"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const index_js_1 = require("../index.js");
exports.default = new forgescript_1.NativeFunction({
    name: '$playerRemoveTrack',
    description: 'Remove a track from a player',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'guildId',
            description: 'The guild id to remove the track from',
            type: forgescript_1.ArgType.Guild,
            required: true,
            rest: false,
        },
        {
            name: 'index',
            description: 'The index of the track to remove',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false,
        },
    ],
    output: forgescript_1.ArgType.Boolean,
    execute(ctx, [guildId, index]) {
        const linked = ctx.client.getExtension(index_js_1.ForgeLinked, true).lavalink;
        if (!linked)
            return this.customError('ForgeLinked is not initialized');
        const player = linked.getPlayer(guildId.id);
        if (!player)
            return this.customError('Player not found');
        player.queue.remove(index);
        return this.success(true);
    },
});
//# sourceMappingURL=playerRemoveTrack.js.map
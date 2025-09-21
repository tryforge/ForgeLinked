"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const index_js_1 = require("../../index.js");
exports.default = new forgescript_1.NativeFunction({
    name: '$playerSwapTracks',
    description: 'Swap the position of two tracks in the queue',
    version: '2.1.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'guildId',
            description: 'The guild id to swap tracks for',
            type: forgescript_1.ArgType.Guild,
            required: true,
            rest: false,
        },
        {
            name: 'indexA',
            description: 'First track index',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false,
        },
        {
            name: 'indexB',
            description: 'Second track index',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false,
        },
    ],
    output: forgescript_1.ArgType.Boolean,
    execute(ctx, [guildId, indexA, indexB]) {
        const linked = ctx.client.getExtension(index_js_1.ForgeLinked, true).lavalink;
        if (!linked)
            return this.customError('ForgeLinked is not initialized');
        const player = linked.getPlayer(guildId.id);
        if (!player)
            return this.customError('Player not found');
        const a = Number(indexA);
        const b = Number(indexB);
        if (!Number.isInteger(a) ||
            !Number.isInteger(b) ||
            a < 0 ||
            b < 0 ||
            a >= player.queue.tracks.length ||
            b >= player.queue.tracks.length) {
            return this.customError('Invalid indices');
        }
        const tracks = player.queue.tracks;
        [tracks[a], tracks[b]] = [tracks[b], tracks[a]];
        return this.success(true);
    },
});
//# sourceMappingURL=playerSwapTracks.js.map
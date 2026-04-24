"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const index_js_1 = require("../../index.js");
exports.default = new forgescript_1.NativeFunction({
    name: '$playerStop',
    description: 'Stops playback without destroying the player',
    version: '2.1.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'guildId',
            description: 'The guild id to stop the player for',
            type: forgescript_1.ArgType.Guild,
            required: true,
            rest: false,
        },
        {
            name: 'clearQueue',
            description: 'Whether to clear the queue',
            type: forgescript_1.ArgType.Boolean,
            required: true,
            rest: false,
        },
    ],
    output: forgescript_1.ArgType.Boolean,
    async execute(ctx, [guildId, clearQueue]) {
        try {
            const linked = ctx.client.getExtension(index_js_1.ForgeLinked, true)?.lavalink;
            if (!linked)
                return this.customError('ForgeLinked is not initialized');
            const player = linked.getPlayer(guildId.id);
            if (!player)
                return this.customError('Player not found');
            if (!player.node?.connected)
                return this.customError('Lavalink node is not connected. Please wait for the node to reconnect.');
            await player.stopPlaying(clearQueue);
            return this.success(true);
        }
        catch (err) {
            return this.customError(`Failed to stop player: ${err instanceof Error ? err.message : String(err)}`);
        }
    },
});
//# sourceMappingURL=playerStop.js.map
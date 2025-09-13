"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
exports.default = new forgescript_1.NativeFunction({
    name: '$playerQueueLength',
    description: 'Get the queue length of a player',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'guildId',
            description: 'The guild id to get the queue length for',
            type: forgescript_1.ArgType.Guild,
            required: true,
            rest: false,
        },
    ],
    output: forgescript_1.ArgType.Number,
    execute(ctx, [guildId]) {
        const linked = ctx.client.getExtension(__1.ForgeLinked, true).lavalink;
        if (!linked)
            return this.customError('ForgeLinked is not initialized');
        const player = linked.getPlayer(guildId.id);
        if (!player)
            return this.customError('Player not found');
        return this.success(player.queue.tracks.length.toFixed());
    },
});
//# sourceMappingURL=playerQueueLength.js.map
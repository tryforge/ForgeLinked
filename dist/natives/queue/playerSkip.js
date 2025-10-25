"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const index_js_1 = require("../../index.js");
exports.default = new forgescript_1.NativeFunction({
    name: '$playerSkip',
    description: 'Skip a track. If position not given skips current track.',
    version: '2.1.0',
    brackets: false,
    unwrap: true,
    args: [
        {
            name: 'guildId',
            description: 'The guild id to skip the track for',
            type: forgescript_1.ArgType.Guild,
            required: true,
            rest: false,
        },
        {
            name: 'position',
            description: 'The position to skip to',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false,
        },
        {
            name: 'throwError',
            description: 'Whether to throw an error if the position is out of bounds',
            type: forgescript_1.ArgType.Boolean,
            required: false,
            rest: false,
        },
    ],
    output: forgescript_1.ArgType.Boolean,
    execute(ctx, [guildId, position, throwError]) {
        const linked = ctx.client.getExtension(index_js_1.ForgeLinked, true).lavalink;
        if (!linked)
            return this.customError('ForgeLinked is not initialized');
        if (!guildId)
            guildId = ctx.guild;
        if (!guildId)
            return this.customError('Unable to find any guild. Ensure this command was ran inside of a guild and not dms or a group chat');
        const player = linked.getPlayer(guildId.id);
        if (!player)
            return this.customError('Player not found');
        if ((position || 0) > player.queue.tracks.length)
            return this.customError('Cannot skip more than the queue size.');
        if (!player.queue.tracks.length && typeof position === 'boolean' && position === true)
            return this.customError("Can't skip more than the queue size");
        player.skip(position || undefined, throwError || false);
        return this.success(true);
    },
});
//# sourceMappingURL=playerSkip.js.map
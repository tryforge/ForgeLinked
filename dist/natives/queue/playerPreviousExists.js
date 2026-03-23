"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const index_js_1 = require("../../index.js");
exports.default = new forgescript_1.NativeFunction({
    name: '$playerPreviousExists',
    description: 'Check if a previous track exists (ignores current until it ends)',
    version: '1.2.0',
    brackets: false,
    unwrap: true,
    args: [
        {
            name: 'guildId',
            description: 'The guild id to check for',
            type: forgescript_1.ArgType.Guild,
            required: false,
            rest: false,
        },
    ],
    output: forgescript_1.ArgType.Boolean,
    execute(ctx, [guildId]) {
        const linked = ctx.client.getExtension(index_js_1.ForgeLinked, true).lavalink;
        if (!linked)
            return this.customError('ForgeLinked is not initialized');
        if (!guildId)
            guildId = ctx.guild;
        if (!guildId)
            return this.customError('Unable to find any guild. Ensure this command was ran inside of a guild and not DMs or a group chat');
        const player = linked.getPlayer(guildId.id);
        if (!player)
            return this.customError('Player not found');
        const previous = player.queue.previous;
        // Empty history → nothing to go back to.
        if (!previous.length)
            return this.success(false);
        // lavalink-client pushes the currently-playing track into previous[0] the
        // moment it starts, so checking only [0] is unreliable.  Scan the whole
        // array and report true only when at least one entry differs from the
        // current track.
        const currentId = player.queue.current?.info.identifier;
        const hasPrev = previous.some((t) => t.info.identifier !== currentId);
        return this.success(hasPrev);
    },
});
//# sourceMappingURL=playerPreviousExists.js.map
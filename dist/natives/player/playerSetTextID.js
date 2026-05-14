"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const index_js_1 = require("../../index.js");
exports.default = new forgescript_1.NativeFunction({
    name: '$playerSetTextID',
    description: 'Set the text channel ID of a player',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'guildId',
            description: 'The guild id to set the text channel for',
            type: forgescript_1.ArgType.Guild,
            required: true,
            rest: false,
        },
        {
            name: 'textChannelId',
            description: 'The new text channel ID to assign to the player',
            type: forgescript_1.ArgType.TextChannel,
            required: true,
            rest: false,
        },
    ],
    output: forgescript_1.ArgType.String,
    execute(ctx, [guildId, textChannel]) {
        try {
            const linked = ctx.client.getExtension(index_js_1.ForgeLinked, true)?.lavalink;
            if (!linked)
                return this.customError('ForgeLinked is not initialized');
            const player = linked.getPlayer(guildId.id);
            if (!player)
                return this.customError('Player not found');
            player.textChannelId = textChannel.id;
            return this.success(textChannel.id);
        }
        catch (err) {
            return this.customError(`Failed to set text channel ID: ${err instanceof Error ? err.message : String(err)}`);
        }
    },
});
//# sourceMappingURL=playerSetTextID.js.map
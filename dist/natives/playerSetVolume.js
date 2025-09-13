"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const index_js_1 = require("../index.js");
exports.default = new forgescript_1.NativeFunction({
    name: '$playerSetVolume',
    description: 'Set the volume of a player',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'guildId',
            description: 'The guild id to set the volume for',
            type: forgescript_1.ArgType.Guild,
            required: true,
            rest: false,
        },
        {
            name: 'volume',
            description: 'The volume to set for the player',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false,
        },
    ],
    output: forgescript_1.ArgType.Boolean,
    execute(ctx, [guildId, volume]) {
        const linked = ctx.client.getExtension(index_js_1.ForgeLinked, true).lavalink;
        if (!linked)
            return this.customError('ForgeLinked is not initialized');
        const player = linked.getPlayer(guildId.id);
        if (!player)
            return this.customError('Player not found');
        player.setVolume(volume);
        return this.success(true);
    },
});
//# sourceMappingURL=playerSetVolume.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const index_js_1 = require("../index.js");
exports.default = new forgescript_1.NativeFunction({
    name: '$playerExists',
    description: 'Check if a player exists',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'guildId',
            description: 'The guild id to check for',
            type: forgescript_1.ArgType.Guild,
            required: true,
            rest: false,
        },
    ],
    output: forgescript_1.ArgType.Boolean,
    execute(ctx, [guildId]) {
        const linked = ctx.client.getExtension(index_js_1.ForgeLinked, true).lavalink;
        if (!linked)
            return this.customError('ForgeLinked is not initialized');
        const player = linked.getPlayer(guildId.id);
        return this.success(player !== null);
    },
});
//# sourceMappingURL=playerExists.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const index_js_1 = require("../../index.js");
var LoopMode;
(function (LoopMode) {
    LoopMode["OFF"] = "off";
    LoopMode["TRACK"] = "track";
    LoopMode["QUEUE"] = "queue";
})(LoopMode || (LoopMode = {}));
exports.default = new forgescript_1.NativeFunction({
    name: '$playerToggleLoop',
    description: 'Set repeat mode to off, track, or queue',
    version: '2.1.0',
    brackets: false,
    unwrap: true,
    args: [
        {
            name: 'guildId',
            description: 'The guild id to set the loop mode for',
            type: forgescript_1.ArgType.Guild,
            required: true,
            rest: false,
        },
        {
            name: 'mode',
            description: 'The loop mode',
            type: forgescript_1.ArgType.Enum,
            enum: LoopMode,
            required: true,
            rest: false,
        },
    ],
    output: forgescript_1.ArgType.Boolean,
    async execute(ctx, [guildId, mode]) {
        const linked = ctx.client.getExtension(index_js_1.ForgeLinked, true).lavalink;
        if (!linked)
            return this.customError('ForgeLinked is not initialized');
        const player = linked.getPlayer(guildId.id);
        if (!player)
            return this.customError('Player not found');
        await player.setRepeatMode(mode);
        return this.success(true);
    },
});
//# sourceMappingURL=playerToggleLoop.js.map
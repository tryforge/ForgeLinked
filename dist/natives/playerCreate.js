"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const index_js_1 = require("../index.js");
exports.default = new forgescript_1.NativeFunction({
    name: '$playerCreate',
    description: 'Create a player for a guild',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'guildId',
            description: 'The guild id to create the player for',
            type: forgescript_1.ArgType.Guild,
            required: true,
            rest: false,
        },
        {
            name: 'voiceID',
            description: 'The ID of the voice channel for the bot to use',
            type: forgescript_1.ArgType.Channel,
            required: true,
            rest: false,
        },
        {
            name: 'textID',
            description: 'The ID of the text channel for the bot to use',
            type: forgescript_1.ArgType.Channel,
            required: false,
            rest: false,
        },
    ],
    output: forgescript_1.ArgType.Boolean,
    execute(ctx, [guildId, voiceId, textId]) {
        const linked = ctx.client.getExtension(index_js_1.ForgeLinked, true).lavalink;
        if (!linked)
            return this.customError('ForgeLinked is not initialized');
        linked.createPlayer({
            guildId: guildId.id,
            voiceChannelId: voiceId.id,
            textChannelId: textId?.id,
            volume: 100,
            selfDeaf: true,
            selfMute: false,
        });
        return this.success(linked.players.has(guildId.id));
    },
});
//# sourceMappingURL=playerCreate.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const index_js_1 = require("../index.js");
exports.default = new forgescript_1.NativeFunction({
    name: '$playerCurrentLyrics',
    description: 'Get the current lyrics of a player',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'guildId',
            description: 'The guild id to get the current lyrics for',
            type: forgescript_1.ArgType.Guild,
            required: true,
            rest: false,
        },
    ],
    output: forgescript_1.ArgType.String,
    async execute(ctx, [guildId]) {
        const linked = ctx.client.getExtension(index_js_1.ForgeLinked, true).lavalink;
        if (!linked)
            return this.customError('ForgeLinked is not initialized');
        const player = linked.getPlayer(guildId.id);
        if (!player)
            return this.customError('Player not found');
        try {
            const lyrics = await player.getCurrentLyrics();
            if (!lyrics?.text)
                return this.customError('No lyrics found.');
            return this.success(lyrics.text);
        }
        catch (err) {
            console.error('[Lavalink] Lyrics error:', err);
            return this.customError('Could not fetch lyrics. Player is safe.');
        }
    },
});
//# sourceMappingURL=playerCurrentLyrics.js.map
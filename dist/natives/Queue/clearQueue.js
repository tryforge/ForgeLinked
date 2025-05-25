"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const ForgeLink_1 = require("../../classes/structures/ForgeLink");
exports.default = new forgescript_1.NativeFunction({
    name: '$clearQueue',
    description: 'Clears the queue/all tracks from the guild player',
    version: "1.0.0",
    brackets: false,
    unwrap: true,
    args: [
        forgescript_1.Arg.requiredGuild('Guild ID', 'The ID of the guild '),
    ],
    output: forgescript_1.ArgType.String,
    execute: async function (ctx, [guild = ctx.guild]) {
        const lavalink = ctx.client.getExtension(ForgeLink_1.ForgeLink, true).lavalink;
        const player = lavalink.getPlayer((guild.id ?? ctx.guild.id));
        if (!player)
            return this.customError("No player found!");
        player.queue.utils.destroy;
        return this.success();
    }
});

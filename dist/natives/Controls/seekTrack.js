"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const ForgeLink_1 = require("../../classes/structures/ForgeLink");
exports.default = new forgescript_1.NativeFunction({
    name: '$seekTrack',
    description: 'Seeks a track',
    version: "1.2.0",
    brackets: true,
    unwrap: true,
    args: [
        forgescript_1.Arg.requiredGuild('Guild ID', 'The ID of the guild'),
        {
            name: 'duration',
            description: 'Seek duration applied',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        }
    ],
    output: forgescript_1.ArgType.String,
    execute: async function (ctx, [guild = ctx.guild, duration]) {
        const kazagumo = ctx.client.getExtension(ForgeLink_1.ForgeLink, true).kazagumo;
        const player = kazagumo.getPlayer((guild.id ?? ctx.guild.id));
        if (!player)
            return this.customError("No player found!");
        await player.seek(duration);
        return this.success();
    }
});

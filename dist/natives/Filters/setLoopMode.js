"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const ForgeLink_1 = require("../../classes/structures/ForgeLink");
const validModes = ['none', 'queue', 'track'];
exports.default = new forgescript_1.NativeFunction({
    name: '$setLoopMode',
    description: 'Set the loop mode of the music player.',
    version: "1.2.0",
    brackets: true,
    unwrap: true,
    args: [
        forgescript_1.Arg.requiredGuild('Guild ID', 'The ID of the guild'),
        {
            name: 'mode',
            description: 'The loop mode of the music player.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        }
    ],
    output: forgescript_1.ArgType.String,
    execute: async function (ctx, [guild = ctx.guild, mode]) {
        const kazagumo = ctx.client.getExtension(ForgeLink_1.ForgeLink, true).kazagumo;
        const player = kazagumo.getPlayer((guild.id ?? ctx.guild.id));
        if (!player)
            return this.customError("No player found!");
        if (!validModes.includes(mode)) {
            return this.customError(`Invalid loop mode: "${mode}". Must of type: ${validModes.join(', ')}`);
        }
        await player.setLoop(mode);
        return this.success();
    }
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const ForgeLink_1 = require("../../classes/structures/ForgeLink");
const QueueMemory_1 = require("../../utils/QueueMemory");
exports.default = new forgescript_1.NativeFunction({
    name: '$unshuffleQueue',
    description: 'Restores the Kazagumo queue to its original order.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [forgescript_1.Arg.requiredGuild('Guild ID', 'The ID of the guild')],
    output: forgescript_1.ArgType.String,
    async execute(ctx, [guild = ctx.guild]) {
        const music = ctx.client.getExtension(ForgeLink_1.ForgeLink);
        const player = music.kazagumo.getPlayer(guild.id ?? ctx.guild.id);
        if (!player)
            return this.customError("No player found!");
        const original = (0, QueueMemory_1.getOriginalQueue)(guild.id);
        if (!original)
            return this.customError("No original queue saved.");
        player.queue.clear();
        for (const track of original) {
            player.queue.add(track);
        }
        (0, QueueMemory_1.clearOriginalQueue)(guild.id);
        return this.success("Queue unshuffled and restored.");
    }
});

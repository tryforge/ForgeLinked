"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const ForgeLink_1 = require("../../classes/structures/ForgeLink");
const QueueMemory_1 = require("../../utils/QueueMemory");
exports.default = new forgescript_1.NativeFunction({
    name: '$shuffleQueue',
    description: 'Shuffles the current Kazagumo queue.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [forgescript_1.Arg.requiredGuild('Guild ID', 'The ID of the guild')],
    output: forgescript_1.ArgType.String,
    async execute(ctx, [guild = ctx.guild]) {
        const music = ctx.client.getExtension(ForgeLink_1.ForgeLink);
        const player = music.kazagumo.getPlayer(guild.id ?? ctx.guild.id);
        if (!player)
            return this.customError("No player found!");
        if (!player.queue.totalSize)
            return this.customError("Queue is empty.");
        if (!(0, QueueMemory_1.hasOriginalQueue)(guild.id)) {
            const original = [];
            for (let i = 0; i < player.queue.totalSize; i++) {
                const track = player.queue.at(i);
                if (track)
                    original.push(track);
            }
            (0, QueueMemory_1.setOriginalQueue)(guild.id, original);
        }
        player.queue.shuffle();
        return this.success("Queue shuffled.");
    }
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const ForgeLink_1 = require("../../classes/structures/ForgeLink");
exports.default = new forgescript_1.NativeFunction({
    name: '$queue',
    description: 'displays the queue/all tracks from the guild player',
    version: "1.0.3",
    brackets: false,
    unwrap: true,
    args: [
        forgescript_1.Arg.requiredGuild('Guild ID', 'The ID of the guild '),
    ],
    output: forgescript_1.ArgType.Json,
    execute: async function (ctx, [guild = ctx.guild]) {
        const lavalink = ctx.client.getExtension(ForgeLink_1.ForgeLink, true).lavalink;
        const player = lavalink.getPlayer((guild.id ?? ctx.guild.id));
        if (!player)
            return this.customError("No player found!");
        const queueTracks = [];
        if (player.queue.current) {
            queueTracks.push({
                trackSource: player.queue.current.info.sourceName,
                trackTitle: player.queue.current.info.title,
                trackAuthor: player.queue.current.info.author,
                trackUri: player.queue.current.info.uri,
                length: player.queue.current.info.duration,
                requester: player.queue.current.requester
            });
        }
        // Get the rest of the queued tracks
        const queueSize = Number(player.queue.tracks.length.toFixed());
        for (let i = 0; i < queueSize; i++) {
            const track = player.queue.tracks.at(i);
            if (track) {
                queueTracks.push({
                    trackSource: track.info.sourceName,
                    trackTitle: track.info.title,
                    trackAuthor: track.info.author,
                    trackUri: track.info.uri,
                    length: track.info.duration,
                    requester: track.requester
                });
            }
        }
        return this.successJSON({ guildId: guild.id, tracks: queueTracks });
    }
});

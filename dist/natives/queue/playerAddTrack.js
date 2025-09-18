"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const index_js_1 = require("../../index.js");
exports.default = new forgescript_1.NativeFunction({
    name: '$playerAddTrack',
    description: 'Add a track to a player',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'query',
            description: 'The query to search for',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
        {
            name: 'guildId',
            description: 'The guild id to add the track to',
            type: forgescript_1.ArgType.Guild,
            required: false,
            rest: false,
        },
    ],
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [query, guildId]) {
        const lavalink = ctx.client.getExtension(index_js_1.ForgeLinked, true).lavalink;
        if (!guildId)
            guildId = ctx.guild;
        if (!guildId)
            return this.customError('Unable to find any guild. Ensure this command was ran inside of a guild and not dms or a group chat');
        let player = lavalink.getPlayer(guildId.id);
        if (!player)
            return this.customError('Player not found');
        if (!player.connected)
            await player.connect();
        const result = await player.search({ query, source: 'ytsearch' }, ctx.member);
        if (!result || !result.tracks.length)
            return this.customError('No results found!');
        if (result.loadType === 'playlist') {
            player.queue.add(result.tracks);
        }
        else {
            player.queue.add(result.tracks[0]);
        }
        if (!player.playing)
            await player.play();
        const requester = result.tracks[0].requester;
        return this.successJSON({
            status: 'success',
            type: result.loadType,
            message: result.loadType === 'playlist'
                ? `Queued ${result.tracks.length} from ${result.playlist?.title}`
                : `Queued ${result.tracks[0].info.title}`,
            playlistName: result.loadType === 'playlist' ? result.playlist?.title : null,
            trackCount: result.loadType === 'playlist' ? result.tracks.length : 1,
            trackTitle: result.loadType !== 'playlist' ? result.tracks[0].info.title : null,
            trackAuthor: result.loadType !== 'playlist' ? result.tracks[0].info.author : null,
            trackImage: result.tracks[0].info.artworkUrl,
            requester: requester?.id || 'Unknown',
        });
    },
});
//# sourceMappingURL=playerAddTrack.js.map
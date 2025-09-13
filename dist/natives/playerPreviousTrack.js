import { NativeFunction, ArgType } from "@tryforge/forgescript";
import { ForgeLinked } from "../index.js";
export default new NativeFunction({
    name: "$playerPreviousTrack",
    description: "Play the previous track of a player",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "guildId",
            description: "The guild ID to play the previous track of",
            type: ArgType.Guild,
            required: true,
            rest: false,
        },
    ],
    async execute(ctx, [guildId]) {
        const start = Date.now();
        const kazagumo = ctx.client.getExtension(ForgeLinked, true).kazagumo;
        const player = kazagumo.players.get(guildId.id);
        if (!player) {
            return this.customError("No player found for this guild");
        }
        const previous = await player.getPrevious(true);
        if (!previous) {
            return this.customError("No previous track found");
        }
        await player.play(previous);
        const requester = previous.requester;
        return this.successJSON({
            ping: Date.now() - start,
            status: "success",
            message: `Now playing previous track: ${previous.title}`,
            trackTitle: previous.title,
            trackAuthor: previous.author,
            trackImage: previous.thumbnail,
            requester: requester.id,
            queuePosition: player.queue.length,
            queueTotalTracks: player.queue.length,
            queueIsPlayingNow: !player.playing && !player.paused,
        });
    },
});
//# sourceMappingURL=playerPreviousTrack.js.map
import { NativeFunction, ArgType } from "@tryforge/forgescript";
import { ForgeLinked } from "../index.js";
export default new NativeFunction({
    name: "$playerResume",
    version: "0.0.0",
    description: "Resume a player",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "guildId",
            description: "The guild ID to resume the player for",
            type: ArgType.Guild,
            required: true,
            rest: false,
        },
    ],
    async execute(ctx, [guildId]) {
        const linked = ctx.client.getExtension(ForgeLinked, true).kazagumo;
        const player = linked.players.get(guildId.id);
        if (!player)
            return this.customError('No player found for this guil');
        player.pause(false);
        return this.success();
    }
});
//# sourceMappingURL=playerResume.js.map
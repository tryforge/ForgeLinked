import { NativeFunction, ArgType } from "@tryforge/forgescript";
import { ForgeLinked } from "../index.js";

export default new NativeFunction({
  name: '$playerPause',
  description: 'Pause a player',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'guildId',
      description: 'The guild id to pause the player for',
      rest: false,
      type: ArgType.Guild,
      required: true,
    }
  ],
  async execute(ctx, [guildId]) {
    const linked = ctx.client.getExtension(ForgeLinked, true).kazagumo
    const player = linked.players.get(guildId.id)
    if (!player) return this.customError('No player found for this guild')

    player.pause(true)

    return this.success(true)
  }
})
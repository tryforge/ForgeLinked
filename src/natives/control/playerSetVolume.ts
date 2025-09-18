import { ArgType, NativeFunction } from '@tryforge/forgescript'

import { ForgeLinked } from '../../index.js'

export default new NativeFunction({
  name: '$playerSetVolume',
  description: 'Set the volume of a player',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'volume',
      description: 'The volume to set for the player',
      type: ArgType.Number,
      required: true,
      rest: false,
    },
    {
      name: 'guildId',
      description: 'The guild id to set the volume for',
      type: ArgType.Guild,
      required: false,
      rest: false,
    },
  ],
  output: ArgType.Boolean,
  execute(ctx, [volume, guildId]) {
    const linked = ctx.client.getExtension(ForgeLinked, true).lavalink
    if (!linked) return this.customError('ForgeLinked is not initialized')
    if (!guildId) guildId = ctx.guild
    if (!guildId)
      return this.customError(
        'Unable to find any guild. Ensure this command was ran inside of a guild and not dms or a group chat',
      )
    const player = linked.getPlayer(guildId.id)
    if (!player) return this.customError('Player not found')
    player.setVolume(volume)
    return this.success(true)
  },
})

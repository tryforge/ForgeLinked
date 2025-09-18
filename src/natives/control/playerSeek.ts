import { ArgType, NativeFunction } from '@tryforge/forgescript'

import { ForgeLinked } from '../../index.js'

export default new NativeFunction({
  name: '$playerSeek',
  description: 'Seek a player',
  version: '2.1.0',
  brackets: false,
  unwrap: true,
  args: [
    {
      name: 'position',
      description: 'The position to seek the player to',
      type: ArgType.Number,
      required: true,
      rest: false,
    },
    {
      name: 'guildId',
      description: 'The guild id to seek the player for',
      type: ArgType.Guild,
      required: false,
      rest: false,
    },
  ],
  output: ArgType.Boolean,
  async execute(ctx, [position, guildId]) {
    const linked = ctx.client.getExtension(ForgeLinked, true).lavalink
    if (!linked) return this.customError('ForgeLinked is not initialized')
    if (!guildId) guildId = ctx.guild
    if (!guildId)
      return this.customError(
        'Unable to find any guild. Ensure this command was ran inside of a guild and not dms or a group chat',
      )
    const player = linked.getPlayer(guildId.id)
    if (!player) return this.customError('Player not found')
    await player.seek(position)
    return this.success(true)
  },
})
import { ArgType, NativeFunction } from '@tryforge/forgescript'

import { ForgeLinked } from '../..'

export default new NativeFunction({
  name: '$playerFiltersSetVolume',
  description: 'Set the Filter Volume',
  version: '2.1.0',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'guildId',
      description: 'The guild id to set the volume for',
      type: ArgType.Guild,
      required: false,
      rest: false,
    },
    {
      name: 'volume',
      description: 'The volume to set',
      type: ArgType.Number,
      required: true,
      rest: false,
    },
  ],
  output: ArgType.Boolean,
  async execute(ctx, [guildId, volume]) {
    const linked = ctx.client.getExtension(ForgeLinked, true).lavalink
    if (!linked) return this.customError('ForgeLinked is not initialized')
    if (!guildId) guildId = ctx.guild
    if (!guildId)
      return this.customError(
        'Unable to find any guild. Ensure this command was ran inside of a guild and not dms or a group chat',
      )
    const player = linked.getPlayer(guildId.id)
    if (!player) return this.customError('Player not found')
    const res = await player.filterManager.setVolume(volume)
    return this.success(res)
  },
})

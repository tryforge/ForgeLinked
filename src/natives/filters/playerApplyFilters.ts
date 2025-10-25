import { ArgType, NativeFunction } from '@tryforge/forgescript'

import { ForgeLinked } from '../../'

export default new NativeFunction({
  name: '$playerApplyFilters',
  description:
    'Apply Player filters for lavalink filter sending data, if the filter is enabled / not',
  version: '2.1.0',
  brackets: false,
  unwrap: true,
  args: [
    {
      name: 'guildId',
      description: 'The guild id to apply the filters for',
      type: ArgType.Guild,
      required: false,
      rest: false,
    },
  ],
  async execute(ctx, [guildId]) {
    const linked = ctx.client.getExtension(ForgeLinked, true).lavalink
    if (!linked) return this.customError('ForgeLinked is not initialized')
    if (!guildId) guildId = ctx.guild
    if (!guildId)
      return this.customError(
        'Unable to find any guild. Ensure this command was ran inside of a guild and not dms or a group chat',
      )
    const player = linked.getPlayer(guildId.id)
    if (!player) return this.customError('Player not found')
    await player.filterManager.applyPlayerFilters()
    return this.success()
  },
})

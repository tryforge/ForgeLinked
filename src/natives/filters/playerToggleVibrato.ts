import { ArgType, NativeFunction } from '@tryforge/forgescript'

import { ForgeLinked } from '../../'

export default new NativeFunction({
  name: '$playerToggleVibrato',
  description: 'Enables / Disables the Vibrato effect, (Optional: provide your Own Data)',
  version: '2.1.0',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'guildId',
      description: 'The guild id to toggle vibrato for',
      type: ArgType.Guild,
      required: false,
      rest: false,
    },
    {
      name: 'frequency',
      description: 'The frequency for the vibrato effect',
      type: ArgType.Number,
      required: false,
      rest: false,
    },
    {
      name: 'depth',
      description: 'The depth for the vibrato effect',
      type: ArgType.Number,
      required: false,
      rest: false,
    },
  ],
  output: ArgType.Boolean,
  async execute(ctx, [guildId, frequency, depth]) {
    const linked = ctx.client.getExtension(ForgeLinked, true).lavalink
    if (!linked) return this.customError('ForgeLinked is not initialized')
    if (!guildId) guildId = ctx.guild
    if (!guildId)
      return this.customError(
        'Unable to find any guild. Ensure this command was ran inside of a guild and not dms or a group chat',
      )
    const player = linked.getPlayer(guildId.id)
    if (!player) return this.customError('Player not found')
    const res = await player.filterManager.toggleVibrato(
      frequency as number | undefined,
      depth as number | undefined,
    )
    return this.success(res)
  },
})

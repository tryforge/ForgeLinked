import { ArgType, NativeFunction } from '@tryforge/forgescript'

import { ForgeLinked } from '../../index.js'

enum LoopMode {
  OFF = 'off',
  TRACK = 'track',
  QUEUE = 'queue',
}

export default new NativeFunction({
  name: '$playerToggleLoop',
  description: 'Set repeat mode to off, track, or queue',
  version: '2.1.0',
  brackets: false,
  unwrap: true,
  args: [
    {
      name: 'mode',
      description: 'The loop mode',
      type: ArgType.Enum,
      enum: LoopMode,
      required: true,
      rest: false,
    },
    {
      name: 'guildId',
      description: 'The guild id to set the loop mode for',
      type: ArgType.Guild,
      required: false,
      rest: false,
    },
  ],
  output: ArgType.Boolean,
  async execute(ctx, [mode, guildId]) {
    const linked = ctx.client.getExtension(ForgeLinked, true).lavalink
    if (!linked) return this.customError('ForgeLinked is not initialized')
    if (!guildId) guildId = ctx.guild
    if (!guildId)
      return this.customError(
        'Unable to find any guild. Ensure this command was ran inside of a guild and not dms or a group chat',
      )
    const player = linked.getPlayer(guildId.id)
    if (!player) return this.customError('Player not found')

    await player.setRepeatMode(mode)
    return this.success(true)
  },
})

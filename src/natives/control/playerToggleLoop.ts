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
      name: 'guildId',
      description: 'The guild id to set the loop mode for',
      type: ArgType.Guild,
      required: false,
      rest: false,
    },
    {
      name: 'mode',
      description: 'The loop mode',
      type: ArgType.Enum,
      enum: LoopMode,
      required: true,
      rest: false,
    },
  ],
  output: ArgType.Boolean,
  async execute(ctx, [guildId, mode]) {
    try {
      const linked = ctx.client.getExtension(ForgeLinked, true)?.lavalink
      if (!linked) return this.customError('ForgeLinked is not initialized')
      if (!guildId) guildId = ctx.guild
      if (!guildId)
        return this.customError(
          'Unable to find any guild. Ensure this command was ran inside of a guild and not DMs or a group chat',
        )
      const player = linked.getPlayer(guildId.id)
      if (!player) return this.customError('Player not found')
      if (!player.node?.connected)
        return this.customError(
          'Lavalink node is not connected. Please wait for the node to reconnect.',
        )
      await player.setRepeatMode(mode)
      return this.success(true)
    } catch (err) {
      return this.customError(
        `Failed to set loop mode: ${err instanceof Error ? err.message : String(err)}`,
      )
    }
  },
})

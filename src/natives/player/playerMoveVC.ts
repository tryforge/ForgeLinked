import { ArgType, NativeFunction } from '@tryforge/forgescript'

import { ForgeLinked } from '../../index.js'

export default new NativeFunction({
  name: '$playerMoveVC',
  description: 'Move the player to a different voice channel',
  version: '2.1.0',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'guildId',
      description: 'The guild id to move the player for',
      type: ArgType.Guild,
      required: true,
      rest: false,
    },
    {
      name: 'newVoiceChannelId',
      description: 'The ID of the voice channel to move to',
      type: ArgType.Channel,
      required: true,
      rest: false,
    },
  ],
  output: ArgType.Boolean,
  async execute(ctx, [guildId, newVoiceChannelId]) {
    const linked = ctx.client.getExtension(ForgeLinked, true).lavalink
    if (!linked) return this.customError('ForgeLinked is not initialized')
    const player = linked.getPlayer(guildId.id)
    if (!player) return this.customError('Player not found')
    await player.changeVoiceState({ voiceChannelId: newVoiceChannelId.id })
    return this.success(true)
  },
})

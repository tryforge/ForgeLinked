import { ArgType, NativeFunction } from '@tryforge/forgescript'

import { ForgeLinked } from '../index.js'

export default new NativeFunction({
  name: '$playerCreate',
  description: 'Create a player for a guild',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'guildId',
      description: 'The guild id to create the player for',
      type: ArgType.Guild,
      required: true,
      rest: false,
    },
    {
      name: 'voiceID',
      description: 'The ID of the voice channel for the bot to use',
      type: ArgType.Channel,
      required: true,
      rest: false,
    },
    {
      name: 'textID',
      description: 'The ID of the text channel for the bot to use',
      type: ArgType.Channel,
      required: false,
      rest: false,
    },
  ],
  output: ArgType.Boolean,
  execute(ctx, [guildId, voiceId, textId]) {
    const linked = ctx.client.getExtension(ForgeLinked, true).lavalink
    if (!linked) return this.customError('ForgeLinked is not initialized')
    linked.createPlayer({
      guildId: guildId.id,
      voiceChannelId: voiceId.id,
      textChannelId: textId?.id,
      volume: 100,
      selfDeaf: true,
      selfMute: false,
    })
    return this.success(linked.players.has(guildId.id))
  },
})

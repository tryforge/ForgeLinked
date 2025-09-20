import { ArgType, NativeFunction } from '@tryforge/forgescript'

import { ForgeLinked } from '../../index.js'

export default new NativeFunction({
  name: '$playerCreate',
  description: 'Create a player for a guild',
  version: '1.0.0',
  brackets: true,
  unwrap: true,
  args: [
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
    {
      name: 'volume',
      description: 'The volume to set the player to',
      type: ArgType.Number,
      required: false,
      rest: false,
    },
    {
      name: 'selfDeaf',
      description: 'Whether to deafen the bot',
      type: ArgType.Boolean,
      required: false,
      rest: false,
    },
    {
      name: 'selfMute',
      description: 'Whether to mute the bot',
      type: ArgType.Boolean,
      required: false,
      rest: false,
    },
    {
      name: 'node',
      description: 'The node to use for the player',
      type: ArgType.String,
      required: false,
      rest: false,
    },
    {
      name: 'guildId',
      description: 'The guild id to create the player for',
      type: ArgType.Guild,
      required: false,
      rest: false,
    },
  ],
  output: ArgType.Boolean,
  async execute(ctx, [voiceId, textId, volume, selfDeaf, selfMute, node, guildId]) {
    const linked = ctx.client.getExtension(ForgeLinked, true).lavalink
    if (!linked) return this.customError('ForgeLinked is not initialized')
    if (!guildId) guildId = ctx.guild
    if (!guildId)
      return this.customError(
        'Unable to find any guild. Ensure this command was ran inside of a guild and not dms or a group chat',
      )

    linked.createPlayer({
      guildId: guildId.id,
      voiceChannelId: voiceId.id,
      textChannelId: textId?.id || ctx.channel?.id,
      volume: volume || 100,
      selfDeaf: selfDeaf || true,
      selfMute: selfMute || false,
      node: node || undefined,
    })
    return this.success(linked.players.has(guildId.id))
  },
})

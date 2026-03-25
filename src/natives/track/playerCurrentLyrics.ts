import { ArgType, NativeFunction } from '@tryforge/forgescript'

import { ForgeLinked } from '../../index.js'

export default new NativeFunction({
  name: '$playerCurrentLyrics',
  description: 'Get the current lyrics of a player',
  version: '1.0.0',
  brackets: false,
  unwrap: true,
  args: [
    {
      name: 'guildId',
      description: 'The guild id to get the current lyrics for',
      type: ArgType.Guild,
      required: false,
      rest: false,
    },
  ],
  output: ArgType.String,
  async execute(ctx, [guildId]) {
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
      const lyrics = await player.getCurrentLyrics()
      if (!lyrics?.text) return this.customError('No lyrics found.')
      return this.success(lyrics.text)
    } catch (err) {
      return this.customError(
        `Could not fetch lyrics: ${err instanceof Error ? err.message : String(err)}`,
      )
    }
  },
})

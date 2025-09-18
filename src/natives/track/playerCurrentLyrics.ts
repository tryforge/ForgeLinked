import { ArgType, NativeFunction } from '@tryforge/forgescript'

import { ForgeLinked } from '../../index.js'

export default new NativeFunction({
  name: '$playerCurrentLyrics',
  description: 'Get the current lyrics of a player',
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
    const linked = ctx.client.getExtension(ForgeLinked, true).lavalink
    if (!linked) return this.customError('ForgeLinked is not initialized')
    if (!guildId) guildId = ctx.guild
    if (!guildId)
      return this.customError(
        'Unable to find any guild. Ensure this command was ran inside of a guild and not dms or a group chat',
      )
    const player = linked.getPlayer(guildId.id)
    if (!player) return this.customError('Player not found')
    try {
      const lyrics = await player.getCurrentLyrics()
      if (!lyrics?.text) return this.customError('No lyrics found.')
      return this.success(lyrics.text)
    } catch (err) {
      console.error('[Lavalink] Lyrics error:', err)
      return this.customError('Could not fetch lyrics. Player is safe.')
    }
  },
})

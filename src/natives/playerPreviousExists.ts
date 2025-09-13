import { ArgType, NativeFunction } from '@tryforge/forgescript'

import { ForgeLinked } from '../index.js'

export default new NativeFunction({
  name: '$playerPreviousExists',
  description: 'Checks if a player has a valid previous track in the queue',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'guildId',
      description: 'The guild ID to check',
      type: ArgType.Guild,
      required: true,
      rest: false,
    },
  ],
  async execute(ctx, [guildId]) {
    const kazagumo = ctx.client.getExtension(ForgeLinked, true).kazagumo
    const player = kazagumo.players.get(guildId.id)

    if (!player) return this.customError('No player found for this guild')

    const previousTrack = player.queue.previous
    const currentTrack = player.queue.current

    const exists = Boolean(
      previousTrack && currentTrack && previousTrack[0].uri !== currentTrack.uri,
    )

    return this.success(exists)
  },
})

import { ArgType, NativeFunction } from '@tryforge/forgescript'
import type { User } from 'discord.js'

import { ForgeLinked } from '../../index.js'

export default new NativeFunction({
  name: '$playerTrackRequester',
  description: 'Get the user who requested the current track',
  version: '2.1.0',
  brackets: false,
  unwrap: true,
  args: [
    {
      name: 'guildId',
      description: 'The guild id to get the requester for',
      type: ArgType.Guild,
      required: false,
      rest: false,
    },
  ],
  output: ArgType.String,
  execute(ctx, [guildId]) {
    const linked = ctx.client.getExtension(ForgeLinked, true).lavalink
    if (!linked) return this.customError('ForgeLinked is not initialized')
    if (!guildId) guildId = ctx.guild
    if (!guildId)
      return this.customError(
        'Unable to find any guild. Ensure this command was ran inside of a guild and not dms or a group chat',
      )
    const player = linked.getPlayer(guildId.id)
    if (!player) return this.customError('Player not found')
    const req = player.queue.current?.requester as User | undefined
    return this.success(req?.id || '')
  },
})

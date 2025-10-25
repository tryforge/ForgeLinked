import { ArgType, NativeFunction } from '@tryforge/forgescript'

import { ForgeLinked } from '../../'

enum AudioOutput {
  Mono = 'mono',
  Stereo = 'stereo',
  Left = 'left',
  Right = 'right',
}

export default new NativeFunction({
  name: '$playerSetAudioOutput',
  description: 'Set the AudioOutput Filter',
  version: '2.1.0',
  brackets: false,
  unwrap: true,
  args: [
    {
      name: 'guildId',
      description: 'The guild id to set the audio output for',
      type: ArgType.Guild,
      required: false,
      rest: false,
    },
    {
      name: 'audioOutput',
      description: 'The audio output to set',
      type: ArgType.Enum,
      enum: AudioOutput,
      required: true,
      rest: false,
    },
  ],
  output: ArgType.Boolean,
  execute(ctx, [guildId, audioOutput]) {
    const linked = ctx.client.getExtension(ForgeLinked, true).lavalink
    if (!linked) return this.customError('ForgeLinked is not initialized')
    if (!guildId) guildId = ctx.guild
    if (!guildId)
      return this.customError(
        'Unable to find any guild. Ensure this command was ran inside of a guild and not dms or a group chat',
      )
    const player = linked.getPlayer(guildId.id)
    if (!player) return this.customError('Player not found')
    player.filterManager.setAudioOutput(audioOutput)
    return this.success()
  },
})

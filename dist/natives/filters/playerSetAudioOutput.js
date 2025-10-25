"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../../");
var AudioOutput;
(function (AudioOutput) {
    AudioOutput["Mono"] = "mono";
    AudioOutput["Stereo"] = "stereo";
    AudioOutput["Left"] = "left";
    AudioOutput["Right"] = "right";
})(AudioOutput || (AudioOutput = {}));
exports.default = new forgescript_1.NativeFunction({
    name: '$playerSetAudioOutput',
    description: 'Set the AudioOutput Filter',
    version: '2.1.0',
    brackets: false,
    unwrap: true,
    args: [
        {
            name: 'guildId',
            description: 'The guild id to set the audio output for',
            type: forgescript_1.ArgType.Guild,
            required: false,
            rest: false,
        },
        {
            name: 'audioOutput',
            description: 'The audio output to set',
            type: forgescript_1.ArgType.Enum,
            enum: AudioOutput,
            required: true,
            rest: false,
        },
    ],
    output: forgescript_1.ArgType.Boolean,
    execute(ctx, [guildId, audioOutput]) {
        const linked = ctx.client.getExtension(__1.ForgeLinked, true).lavalink;
        if (!linked)
            return this.customError('ForgeLinked is not initialized');
        if (!guildId)
            guildId = ctx.guild;
        if (!guildId)
            return this.customError('Unable to find any guild. Ensure this command was ran inside of a guild and not dms or a group chat');
        const player = linked.getPlayer(guildId.id);
        if (!player)
            return this.customError('Player not found');
        player.filterManager.setAudioOutput(audioOutput);
        return this.success();
    },
});
//# sourceMappingURL=playerSetAudioOutput.js.map
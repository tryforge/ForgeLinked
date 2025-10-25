"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const forgescript_2 = require("@tryforge/forgescript");
const __1 = require("../../");
var EqBand;
(function (EqBand) {
    EqBand[EqBand["Band60Hz"] = 0] = "Band60Hz";
    EqBand[EqBand["Band170Hz"] = 1] = "Band170Hz";
    EqBand[EqBand["Band310Hz"] = 2] = "Band310Hz";
    EqBand[EqBand["Band600Hz"] = 3] = "Band600Hz";
    EqBand[EqBand["Band1KHz"] = 4] = "Band1KHz";
    EqBand[EqBand["Band3KHz"] = 5] = "Band3KHz";
    EqBand[EqBand["Band6KHz"] = 6] = "Band6KHz";
    EqBand[EqBand["Band12KHz"] = 7] = "Band12KHz";
    EqBand[EqBand["Band14KHz"] = 8] = "Band14KHz";
    EqBand[EqBand["Band16KHz"] = 9] = "Band16KHz";
    EqBand[EqBand["Band18KHz"] = 10] = "Band18KHz";
    EqBand[EqBand["Band20KHz"] = 11] = "Band20KHz";
    EqBand[EqBand["Band22KHz"] = 12] = "Band22KHz";
    EqBand[EqBand["Band24KHz"] = 13] = "Band24KHz";
    EqBand[EqBand["Band26KHz"] = 14] = "Band26KHz";
})(EqBand || (EqBand = {}));
var Gain;
(function (Gain) {
    Gain[Gain["Muted"] = -0.25] = "Muted";
    Gain[Gain["VeryLow"] = 0.25] = "VeryLow";
    Gain[Gain["Half"] = 0.5] = "Half";
    Gain[Gain["SlightBoost"] = 0.75] = "SlightBoost";
    Gain[Gain["Normal"] = 1] = "Normal";
    Gain[Gain["Boosted"] = 1.25] = "Boosted";
    Gain[Gain["StrongBoost"] = 1.5] = "StrongBoost";
    Gain[Gain["Double"] = 2] = "Double";
})(Gain || (Gain = {}));
exports.default = new forgescript_1.NativeFunction({
    name: '$playerFilterSetEQ',
    description: 'Sets the players equalizer band on-top of the existing ones',
    version: '2.1.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'guildId',
            description: 'The guild id to set the equalizer for',
            type: forgescript_2.ArgType.Guild,
            required: false,
            rest: false,
        },
        {
            name: 'eqBand',
            description: 'The band to set the equalizer for',
            type: forgescript_2.ArgType.Enum,
            enum: EqBand,
            required: true,
            rest: false,
        },
        {
            name: 'gain',
            description: 'The gain to set the equalizer for',
            type: forgescript_2.ArgType.Enum,
            enum: Gain,
            required: true,
            rest: false,
        },
    ],
    output: forgescript_2.ArgType.Json,
    async execute(ctx, [guildId, band, gain]) {
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
        const res = await player.filterManager.setEQ({ band, gain });
        return this.successJSON(res);
    },
});
//# sourceMappingURL=playerFilterSetEQ.js.map
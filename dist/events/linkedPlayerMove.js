"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
const ForgeLinkedEventManager_1 = require("../structures/ForgeLinkedEventManager");
exports.default = new ForgeLinkedEventManager_1.ForgeLinkedEventHandler({
    name: 'linkedPlayerMove',
    description: 'This event is called when a player moves',
    listener(player, oldVoiceChannelID, newVoiceChannelID) {
        const commands = this.getExtension(__1.ForgeLinked, true).commands.get('linkedPlayerMove');
        const guild = this.guilds.cache.get(player.guildId);
        for (const command of commands) {
            forgescript_1.Interpreter.run({
                obj: guild,
                client: this,
                command,
                data: command.compiled.code,
                extras: { player, old: oldVoiceChannelID, new: newVoiceChannelID },
            });
        }
    },
});
//# sourceMappingURL=linkedPlayerMove.js.map
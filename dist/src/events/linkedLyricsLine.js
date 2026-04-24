"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
const ForgeLinkedEventManager_1 = require("../structures/ForgeLinkedEventManager");
exports.default = new ForgeLinkedEventManager_1.ForgeLinkedEventHandler({
    name: 'linkedLyricsLine',
    version: '2.0.0',
    description: 'Triggered when a new lyrics line is received',
    listener(player, track, payload) {
        const commands = this.getExtension(__1.ForgeLinked, true).commands.get('linkedLyricsLine');
        const guild = this.guilds.cache.get(player.guildId);
        for (const command of commands) {
            forgescript_1.Interpreter.run({
                obj: guild,
                client: this,
                command,
                data: command.compiled.code,
                extras: { player, track, payload },
            });
        }
    },
});
//# sourceMappingURL=linkedLyricsLine.js.map
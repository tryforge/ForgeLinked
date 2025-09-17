"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
const ForgeLinkedEventManager_1 = require("../structures/ForgeLinkedEventManager");
exports.default = new ForgeLinkedEventManager_1.ForgeLinkedEventHandler({
    name: 'linkedDebug',
    description: 'Triggered for various debug logs and errors',
    listener(eventKey, eventData) {
        const commands = this.getExtension(__1.ForgeLinked, true).commands.get('linkedDebug');
        for (const command of commands) {
            forgescript_1.Interpreter.run({
                obj: this,
                client: this,
                command,
                data: command.compiled.code,
                extras: { eventKey, eventData },
            });
        }
    },
});
//# sourceMappingURL=linkedDebug.js.map
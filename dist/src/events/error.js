"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
const ForgeLinkedEventManager_1 = require("../structures/ForgeLinkedEventManager");
exports.default = new ForgeLinkedEventManager_1.ForgeLinkedEventHandler({
    name: 'error',
    version: '2.0.0',
    description: 'This event is called when an error occurs',
    listener(err) {
        const commands = this.getExtension(__1.ForgeLinked, true).commands.get('error');
        for (const command of commands) {
            forgescript_1.Interpreter.run({
                obj: {},
                client: this,
                command,
                data: command.compiled.code,
                extras: err,
            });
        }
    },
});
//# sourceMappingURL=error.js.map
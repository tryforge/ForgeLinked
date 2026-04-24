"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
const ForgeLinkedEventManager_1 = require("../structures/ForgeLinkedEventManager");
exports.default = new ForgeLinkedEventManager_1.ForgeLinkedEventHandler({
    name: 'linkedNodeConnect',
    version: '2.1.3',
    description: 'Triggered when connects to a node',
    listener(node) {
        const commands = this.getExtension(__1.ForgeLinked, true).commands.get('linkedNodeConnect');
        for (const command of commands) {
            forgescript_1.Interpreter.run({
                obj: {},
                client: this,
                command,
                data: command.compiled.code,
                extras: { node },
            });
        }
    },
});
//# sourceMappingURL=linkedNodeConnect.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NodeEventHandler_1 = require("../../classes/handlers/NodeEventHandler");
const forgescript_1 = require("@tryforge/forgescript");
const ForgeLink_1 = require("../../classes/structures/ForgeLink");
exports.default = new NodeEventHandler_1.NodeEventHandler({
    name: 'create',
    description: '...',
    async listener(node) {
        // @ts-ignore
        const commands = this.getExtension(ForgeLink_1.ForgeLink, true).commands.player.get("create");
        if (!commands)
            return;
        const guild = this.guilds.cache.get(node.guildId);
        for (const command of commands) {
            forgescript_1.Interpreter.run({
                obj: guild,
                client: this,
                command,
                data: command.compiled.code,
                environment: { node }
            });
        }
    }
});

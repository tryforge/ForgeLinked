"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeEventHandler = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const ForgeLink_1 = require("../structures/ForgeLink");
class NodeEventHandler extends forgescript_1.BaseEventHandler {
    register(client) {
        const forgeLink = client.getExtension(ForgeLink_1.ForgeLink, true);
        if (forgeLink.lavalink.nodeManager) {
            forgeLink.lavalink.nodeManager.on(this.name, (...args) => {
                this.listener.apply(client, args);
            });
        }
        else {
            console.warn(`[ForgeLink] Attempted to register event "${this.name}" but Node manager is not initialized.`);
        }
    }
}
exports.NodeEventHandler = NodeEventHandler;

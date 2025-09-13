"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeLinkEventHandler = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const index_js_1 = require("../index.js");
/* -------------------------------------------------------------------------- */
/*                              Unified Handler                               */
/* -------------------------------------------------------------------------- */
class ForgeLinkEventHandler extends forgescript_1.BaseEventHandler {
    register(client) {
        const forgeLink = client.getExtension(index_js_1.ForgeLinked, true);
        // Node events
        if (this.isNodeEvent(this.name)) {
            if (forgeLink.lavalink.nodeManager) {
                forgeLink.lavalink.nodeManager.on(this.name, (...args) => {
                    this.listener.apply(client, args);
                });
            }
            else {
                console.warn(`[ForgeLink] Attempted to register node event "${this.name}" but node manager is not initialized.`);
            }
            return;
        }
        // Lavalink events
        if (forgeLink.lavalink) {
            forgeLink.lavalink.on(this.name, (...args) => {
                this.listener.apply(client, args);
            });
        }
        else {
            console.warn(`[ForgeLink] Attempted to register lavalink event "${this.name}" but manager is not initialized.`);
        }
    }
    isNodeEvent(event) {
        return ['connect', 'disconnect', 'reconnecting', 'create', 'destroy', 'error', 'resumed'].includes(event);
    }
}
exports.ForgeLinkEventHandler = ForgeLinkEventHandler;
//# sourceMappingURL=ForgeLinkedEventManager.js.map
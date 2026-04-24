"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeLinkedEventHandler = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
class ForgeLinkedEventHandler extends forgescript_1.BaseEventHandler {
    register(client) {
        client
            .getExtension(__1.ForgeLinked, true)['emitter'] // @ts-ignore
            .on(this.name, this.listener.bind(client));
    }
}
exports.ForgeLinkedEventHandler = ForgeLinkedEventHandler;
//# sourceMappingURL=ForgeLinkedEventManager.js.map
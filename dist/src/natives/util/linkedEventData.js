"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$linkedEvent',
    description: 'This function is used to get player info on events for forgelinked',
    version: '1.0.0',
    unwrap: false,
    output: forgescript_1.ArgType.Json,
    execute(ctx) {
        return this.successJSON(ctx.runtime.extras);
    },
});
//# sourceMappingURL=linkedEventData.js.map
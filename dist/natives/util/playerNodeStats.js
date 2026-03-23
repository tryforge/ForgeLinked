"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const index_js_1 = require("../../index.js");
exports.default = new forgescript_1.NativeFunction({
    name: '$playerNodeStats',
    description: 'Get CPU, memory, and other stats of a Lavalink node',
    version: '2.1.0',
    // brackets must be true so the optional nodeId argument can actually be passed,
    // e.g. $playerNodeStats[Universe].  With brackets:false the arg is unreachable.
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'nodeId',
            description: 'Optional Lavalink node ID to query stats for',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false,
        },
    ],
    output: forgescript_1.ArgType.Json,
    execute(ctx, [nodeId]) {
        const linked = ctx.client.getExtension(index_js_1.ForgeLinked, true).lavalink;
        if (!linked)
            return this.customError('ForgeLinked is not initialized');
        let node;
        if (nodeId) {
            node = linked.nodeManager.nodes.get(String(nodeId));
        }
        else {
            // .values().next().value is unreliable on some Map implementations —
            // use Array.from to guarantee we get the first entry.
            node = Array.from(linked.nodeManager.nodes.values())[0];
        }
        if (!node)
            return this.customError('Lavalink node not found');
        // node.stats is a cached object that persists after a node disconnects.
        // Return an error instead of stale data when the node is offline.
        if (!node.connected)
            return this.customError('Lavalink node is not connected');
        return this.successJSON(node.stats ?? {});
    },
});
//# sourceMappingURL=playerNodeStats.js.map
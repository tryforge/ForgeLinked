import { ArgType, NativeFunction } from '@tryforge/forgescript'

import { ForgeLinked } from '../../index.js'

export default new NativeFunction({
  name: '$playerNodeStats',
  description: 'Get CPU, memory, and other stats of a Lavalink node',
  version: '2.1.0',
  brackets: false,
  unwrap: true,
  args: [
    {
      name: 'nodeId',
      description: 'Optional Lavalink node ID to query stats for',
      type: ArgType.String,
      required: false,
      rest: false,
    },
  ],
  output: ArgType.Json,
  execute(ctx, [nodeId]) {
    const linked = ctx.client.getExtension(ForgeLinked, true).lavalink
    if (!linked) return this.customError('ForgeLinked is not initialized')

    let node: any | undefined

    if (nodeId) {
      node = linked.nodeManager.nodes.get(String(nodeId))
    } else {
      node = linked.nodeManager.nodes.values().next().value
    }

    if (!node) return this.customError('Lavalink node not found')

    return this.successJSON(node.stats ?? {})
  },
})

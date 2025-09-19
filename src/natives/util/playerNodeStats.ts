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
      // Try to get a specific node by ID
      // @ts-ignore - nodes is expected to be a Map-like structure
      node = linked.nodes?.get?.(String(nodeId))
    } else {
      // Fallback to the first available node
      // @ts-ignore - nodes is expected to be an iterable of node values
      const values = linked.nodes?.values?.()
      node = values ? values.next().value : undefined
    }

    if (!node) return this.customError('Lavalink node not found')

    return this.successJSON(node.stats ?? {})
  },
})

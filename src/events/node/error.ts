import { NodeEventHandler } from '@handlers/NodeEventHandler'
import { Interpreter } from '@tryforge/forgescript'
import { ForgeLink } from '@structures/ForgeLink'

export default new NodeEventHandler({
    name: 'error',
    description: '...',
    async listener(node, error, payload) {
        // @ts-ignore
        const commands = this.getExtension(ForgeLink, true).commands.player.get("error")
        if (!commands) return;

        const guild = this.guilds.cache.get(node.guildId)
        
        for (const command of commands) {
            Interpreter.run({
                obj: guild,
                client: this,
                command,
                data: command.compiled.code,
                environment: { node, error, payload }
            })
        }
    }
})
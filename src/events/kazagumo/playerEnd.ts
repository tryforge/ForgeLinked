import { KazagumoEventHandler } from '@handlers/KazagumoEventHandler'
import { Interpreter } from '@tryforge/forgescript'
import { ForgeLink } from '@structures/ForgeLink'

export default new KazagumoEventHandler({
    name: 'playerEnd',
    description: 'This is player playerEnd it is fired when the player has reached the end of a track/queue',
    async listener(player) {
        const commands = this.getExtension(ForgeLink, true).commands.kazagumo.get('playerEnd')
        if (!commands) return;

        const guild = this.guilds.cache.get(player.guildId)
        
        for (const command of commands) {
            Interpreter.run({
                obj: guild,
                client: this,
                command,
                data: command.compiled.code,
                environment: { player }
            })
        }
    }
})
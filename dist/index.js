/* eslint-disable @typescript-eslint/no-explicit-any */
import { ForgeExtension, Logger } from '@tryforge/forgescript';
import { Kazagumo, KazagumoPlayer } from 'kazagumo';
import path from 'path';
import { Connectors } from 'shoukaku';
import { fileURLToPath } from 'url';
import { ForgeLinkedCommandManager } from './structures/ForgeLinkedCommandManager.js';
/* -------------------------------------------------------------------------- */
/*                              ForgeLinked Class                             */
/* -------------------------------------------------------------------------- */
export class ForgeLinked extends ForgeExtension {
    options;
    name = 'ForgeLinked';
    description = 'ForgeScript integration with Kazagumo (Shoukaku wrapper)';
    version = '1.0.0';
    client;
    kazagumo;
    commands;
    constructor(options) {
        super();
        this.options = options;
    }
    async init(client) {
        const start = Date.now();
        this.client = client;
        // Initialize Kazagumo
        this.kazagumo = new Kazagumo({
            defaultSearchEngine: '',
            send: (guildId, payload) => {
                const guild = this.client.guilds.cache.get(guildId);
                if (guild)
                    guild.shard.send(payload);
            },
        }, new Connectors.DiscordJS(this.client), this.options.nodes);
        // Resolve dist/natives relative to compiled file
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        this.commands = new ForgeLinkedCommandManager(this.client);
        this.load(path.join(__dirname, 'natives'));
        // Bind Kazagumo events to ForgeScript events
        if (this.options.events?.player?.length) {
            for (const event of this.options.events.player) {
                this.kazagumo.on(event, (...args) => {
                    this.client.emit(`kazagumo${String(event).charAt(0).toUpperCase() + String(event).slice(1)}`, ...args);
                });
            }
        }
        Logger.debug(`ForgeLinked: Initialized in ${Date.now() - start}ms`);
    }
}
/* -------------------------------------------------------------------------- */
/*                                  Exports                                   */
/* -------------------------------------------------------------------------- */
export { KazagumoPlayer };
//# sourceMappingURL=index.js.map
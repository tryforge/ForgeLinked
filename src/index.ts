/* eslint-disable @typescript-eslint/no-explicit-any */
import { ForgeClient, ForgeExtension, Logger } from '@tryforge/forgescript'
import { Kazagumo, KazagumoPlayer, KazagumoEvents } from 'kazagumo'
import { Connectors, NodeOption } from 'shoukaku'
import { ForgeLinkedCommandManager } from './structures/ForgeLinkedCommandManager.js'
import path from 'path'
import { fileURLToPath } from 'url'

/* -------------------------------------------------------------------------- */
/*                                Type Options                                */
/* -------------------------------------------------------------------------- */

export interface ForgeLinkSetupOptions {
  nodes: NodeOption[]
  defaultVolume?: number
  events?: {
    player?: (keyof KazagumoEvents)[]
  }
}

/* -------------------------------------------------------------------------- */
/*                              ForgeLinked Class                             */
/* -------------------------------------------------------------------------- */

export class ForgeLinked extends ForgeExtension {
  name = 'ForgeLinked'
  description = 'ForgeScript integration with Kazagumo (Shoukaku wrapper)'
  version = '0.0.0'

  public client!: ForgeClient
  public kazagumo!: Kazagumo
  public commands!: ForgeLinkedCommandManager

  constructor(private readonly options: ForgeLinkSetupOptions) {
    super()
  }

  async init(client: ForgeClient) {
    const start = Date.now()
    this.client = client

    // Initialize Kazagumo
    this.kazagumo = new Kazagumo(
      {
        defaultSearchEngine: '',
        send: (guildId, payload) => {
          const guild = this.client.guilds.cache.get(guildId)
          if (guild) guild.shard.send(payload)
        }
      },
      new Connectors.DiscordJS(this.client),
      this.options.nodes
    )

    // Resolve dist/natives relative to compiled file
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)

    this.commands = new ForgeLinkedCommandManager(this.client)
    this.load(path.join(__dirname, 'natives'))

    // Bind Kazagumo events to ForgeScript events
    if (this.options.events?.player?.length) {
      for (const event of this.options.events.player) {
        this.kazagumo.on(event, (...args: unknown[]) => {
          this.client.emit(
            `kazagumo${String(event).charAt(0).toUpperCase() + String(event).slice(1)}`,
            ...args
          )
        })
      }
    }

    Logger.debug(`ForgeLinked: Initialized in ${Date.now() - start}ms`)
  }
}

/* -------------------------------------------------------------------------- */
/*                                  Exports                                   */
/* -------------------------------------------------------------------------- */

export { KazagumoPlayer }
export type { KazagumoEvents }

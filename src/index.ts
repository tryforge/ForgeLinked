import { EventManager, ForgeClient, ForgeExtension } from '@tryforge/forgescript'
import {
  LavalinkManager,
  LavalinkNodeOptions,
  Player,
  PlayerEvents,
  SearchPlatform,
  Track,
} from 'lavalink-client'
import path from 'path'

import { ForgeLinkedCommandManager } from './structures/ForgeLinkedCommandManager.js'
import { LavalinkEventNames, NodeEventNames } from './structures/ForgeLinkedEventManager.js'

/* -------------------------------------------------------------------------- */
/*                                Type Options                                */
/* -------------------------------------------------------------------------- */

export interface ForgeLinkSetupOptions {
  nodes: LavalinkNodeOptions[]
  defaultVolume?: number
  autoSkip?: boolean
  autoSkipOnResolveError?: boolean
  emitNewSongsOnly?: boolean
  requesterTransformer?: (requester: unknown) => unknown
  autoPlayFunction?: (player: Player, lastPlayedTrack: Track) => Promise<void>
  events?: {
    player?: LavalinkEventNames[]
    node?: NodeEventNames[]
  }
  playerOptions?: {
    applyVolumeAsFilter?: boolean
    clientBasedPositionUpdateInterval?: number
    defaultSearchPlatform?: SearchPlatform
    volumeDecrementer?: number
    useUnresolvedData?: boolean
    onDisconnect?: {
      autoReconnect?: boolean
      destroyPlayer?: boolean
    }
    onEmptyQueue?: {
      destroyAfterMs?: number
    }
  }
  queueOptions?: {
    maxPreviousTracks?: number
  }
  linksAllowed?: boolean
  linksBlacklist?: string[]
  linksWhitelist?: string[]
}

/* -------------------------------------------------------------------------- */
/*                               ForgeLink Class                              */
/* -------------------------------------------------------------------------- */

export class ForgeLinked extends ForgeExtension {
  name = 'ForgeLink'
  description = 'ForgeScript integration with lavalink-client'
  version = '1.0.0'

  public client!: ForgeClient
  public lavalink!: LavalinkManager
  public commands!: ForgeLinkedCommandManager

  constructor(private readonly options: ForgeLinkSetupOptions) {
    super()
  }

  async init(client: ForgeClient) {
    const start = Date.now()
    this.client = client

    this.lavalink = new LavalinkManager({
      nodes: this.options.nodes,
      sendToShard: (guildId, payload) => {
        const guild = this.client.guilds.cache.get(guildId)
        if (guild) guild.shard.send(payload)
        return Promise.resolve()
      },
      autoSkip: this.options.autoSkip ?? true,
      autoSkipOnResolveError: this.options.autoSkipOnResolveError ?? true,
      emitNewSongsOnly: this.options.emitNewSongsOnly ?? true,
      playerOptions: {
        applyVolumeAsFilter: this.options.playerOptions?.applyVolumeAsFilter ?? false,
        clientBasedPositionUpdateInterval:
          this.options.playerOptions?.clientBasedPositionUpdateInterval ?? 50,
        defaultSearchPlatform:
          this.options.playerOptions?.defaultSearchPlatform ?? ('ytsearch' as SearchPlatform),
        volumeDecrementer: this.options.playerOptions?.volumeDecrementer ?? 0.75,
        useUnresolvedData: this.options.playerOptions?.useUnresolvedData ?? true,
        requesterTransformer: this.options.requesterTransformer,
        onDisconnect: {
          autoReconnect: this.options.playerOptions?.onDisconnect?.autoReconnect ?? true,
          destroyPlayer: this.options.playerOptions?.onDisconnect?.destroyPlayer ?? false,
        },
        onEmptyQueue: {
          destroyAfterMs: this.options.playerOptions?.onEmptyQueue?.destroyAfterMs ?? 30000,
          autoPlayFunction: this.options.autoPlayFunction,
        },
      },
      queueOptions: {
        maxPreviousTracks: this.options.queueOptions?.maxPreviousTracks ?? 10,
      },
      linksAllowed: this.options.linksAllowed ?? true,
      linksBlacklist: this.options.linksBlacklist ?? [],
      linksWhitelist: this.options.linksWhitelist ?? [],
    })

    this.commands = new ForgeLinkedCommandManager(this.client)

    client.on('raw', (packet) => {
      this.lavalink.sendRawData(packet).catch((err) => {
        console.error('Failed to send raw data to Lavalink:', err)
      })
    })

    this.load(path.join(__dirname, './natives'))

    if (this.options.events?.player?.length) {
      for (const event of this.options.events.player) {
        this.lavalink.on(event as any, (...args: unknown[]) => {
          this.client.emit(
            `lavalink${String(event).charAt(0).toUpperCase() + String(event).slice(1)}`,
            ...args,
          )
        })
      }
    }
    client.on('ready', () => {
      this.lavalink.init({
        id: client.user.id,
        username: client.user.username,
      })
    })

    console.debug(`ForgeLink: Initialized in ${Date.now() - start}ms`)
  }
}

/* -------------------------------------------------------------------------- */
/*                                  Exports                                   */
/* -------------------------------------------------------------------------- */

export type { PlayerEvents, SearchPlatform, LavalinkNodeOptions }

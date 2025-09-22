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
import { TypedEmitter } from 'tiny-typed-emitter'

import { ForgeLinkedCommandManager } from './structures/ForgeLinkedCommandManager.js'
import { IForgeLinkedEvents } from './structures/ForgeLinkedEventManager'

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
  events?: Array<keyof IForgeLinkedEvents>
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

export type TransformEvents<T> = {
  [P in keyof T]: T[P] extends unknown[] ? (...args: T[P]) => void : never
}

/* -------------------------------------------------------------------------- */
/*                               ForgeLink Class                              */
/* -------------------------------------------------------------------------- */

export class ForgeLinked extends ForgeExtension {
  name = 'ForgeLink'
  description = 'ForgeScript integration with lavalink-client'
  version = '2.0.1'

  public client!: ForgeClient
  public lavalink!: LavalinkManager
  public commands!: ForgeLinkedCommandManager

  private emitter = new TypedEmitter<TransformEvents<IForgeLinkedEvents>>()

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
    EventManager.load('ForgeLinked', __dirname + `/events`)
    if (this.options.events?.length) {
      this.client.events.load('ForgeLinked', this.options.events)
    }

    client.on('raw', (packet) => {
      this.lavalink.sendRawData(packet).catch((err) => {
        console.error('Failed to send raw data to Lavalink:', err)
      })
    })

    this.load(path.join(__dirname, './natives'))
    client.on('ready', () => {
      this.lavalink.init({
        id: client.user.id,
        username: client.user.username,
      })
    })

    if (this.options.events?.length) {
      for (const linkedEvent of this.options.events) {
        const lavalinkEvent = linkedEvent.startsWith('linked')
          ? linkedEvent.charAt(6).toLowerCase() + linkedEvent.slice(7)
          : linkedEvent

        this.lavalink.on(lavalinkEvent as any, (...args: unknown[]) => {
          this.emitter.emit(linkedEvent as keyof IForgeLinkedEvents, ...(args as any))
        })
      }
    }
    console.debug(`ForgeLink: Initialized in ${Date.now() - start}ms`)
  }
}

/* -------------------------------------------------------------------------- */
/*                                  Exports                                   */
/* -------------------------------------------------------------------------- */

export type { PlayerEvents, SearchPlatform, LavalinkNodeOptions }

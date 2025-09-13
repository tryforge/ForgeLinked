import { ForgeClient, ForgeExtension } from '@tryforge/forgescript';
import { LavalinkManager, LavalinkNodeOptions, Player, PlayerEvents, SearchPlatform, Track } from 'lavalink-client';
import { ForgeLinkedCommandManager } from './structures/ForgeLinkedCommandManager.js';
export interface ForgeLinkSetupOptions {
    nodes: LavalinkNodeOptions[];
    defaultVolume?: number;
    autoSkip?: boolean;
    autoSkipOnResolveError?: boolean;
    emitNewSongsOnly?: boolean;
    requesterTransformer?: (requester: unknown) => unknown;
    autoPlayFunction?: (player: Player, lastPlayedTrack: Track) => Promise<void>;
    events?: {
        player?: any[];
        node?: any[];
    };
    playerOptions?: {
        applyVolumeAsFilter?: boolean;
        clientBasedPositionUpdateInterval?: number;
        defaultSearchPlatform?: SearchPlatform;
        volumeDecrementer?: number;
        useUnresolvedData?: boolean;
        onDisconnect?: {
            autoReconnect?: boolean;
            destroyPlayer?: boolean;
        };
        onEmptyQueue?: {
            destroyAfterMs?: number;
        };
    };
    queueOptions?: {
        maxPreviousTracks?: number;
    };
    linksAllowed?: boolean;
    linksBlacklist?: string[];
    linksWhitelist?: string[];
}
export declare class ForgeLinked extends ForgeExtension {
    private readonly options;
    name: string;
    description: string;
    version: string;
    client: ForgeClient;
    lavalink: LavalinkManager;
    commands: ForgeLinkedCommandManager;
    constructor(options: ForgeLinkSetupOptions);
    init(client: ForgeClient): Promise<void>;
}
export type { PlayerEvents, SearchPlatform, LavalinkNodeOptions };
